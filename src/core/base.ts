import type { BaseDescriptor, BaseSchemaOptions, ElFormRule, ElFormTrigger, RuleDescriptor, ValrFormRule } from '../types'
import AsyncValidator from 'async-validator'
import { generateMessage } from '../utils/messages'
import { toAsyncValidatorRules } from '../utils/transform'

abstract class BaseSchema<T> {
  private readonly _type: BaseSchemaOptions['type']
  private readonly _messages: BaseSchemaOptions['messages']
  private _descriptors: RuleDescriptor<T>[] = []
  private _optional: ((value: unknown) => boolean) | null = null

  constructor(options: BaseSchemaOptions) {
    this._type = options.type
    this._messages = options.messages
  }

  /**
   * 校验函数
   * @param descriptor 校验配置描述符
   * @param value 经过类型转换后的值
   * @param input 原始输入值
   * @returns 是否校验通过
   */
  abstract _test(descriptor: BaseDescriptor<T>, value: T, input: any): boolean

  /**
   * 获取错误消息
   * @param descriptor 校验配置描述符
   * @returns 错误消息字符串
   */
  private _getMessage(descriptor: BaseDescriptor<T>): string {
    const { kind, message, value } = descriptor as any

    if (typeof message === 'function')
      return message(descriptor)
    if (message)
      return message

    const key = `${this._type}.${kind}` as keyof typeof this._messages
    const defaultMessage = this._messages[key] || this._messages.default

    return generateMessage(
      defaultMessage,
      Array.isArray(value) ? value : [value],
    )
  }

  /**
   * 添加校验描述符
   * @param descriptor 校验配置描述符
   */
  protected _addDescriptor(descriptor: RuleDescriptor<T>) {
    this._descriptors.push(descriptor)
  }

  /**
   * 类型转换处理器
   * @param value 原始输入值
   * @returns 转换结果和错误信息
   */
  private _convertValue(value: any): { converted: any, error?: string } {
    if (this._type === 'string') {
      return { converted: String(value) }
    }

    if (this._type === 'number') {
      const num = Number(value)
      return Number.isNaN(num)
        ? { error: this._messages['types.number'], converted: num }
        : { converted: num }
    }

    if (this._type === 'array' && !Array.isArray(value)) {
      return { error: this._messages['types.array'], converted: value }
    }

    return { converted: value }
  }

  /**
   * 校验核心逻辑
   * @param descriptors 校验描述符列表
   * @param value 待校验值
   * @returns 错误消息或undefined
   */
  protected _validator(descriptors: BaseDescriptor<T>[], value: any): string | undefined {
    if (this._optional?.(value))
      return

    const { converted, error } = this._convertValue(value)
    if (error)
      return error

    for (const descriptor of descriptors) {
      if (descriptor.kind === 'custom') {
        const customError = descriptor.validator(converted, value)
        if (customError)
          return customError
      }
      else if (!this._test(descriptor, converted, value)) {
        return this._getMessage(descriptor)
      }
    }
  }

  /**
   * 生成UI框架校验规则
   * @param descriptors 校验描述符列表
   * @returns 校验规则对象
   */
  protected _toRule(descriptors: BaseDescriptor<T>[]): ValrFormRule {
    return {
      type: this._type,
      validator: (value, callback) => {
        callback(this._validator(descriptors, value))
      },
    }
  }

  /**
   * 获取校验规则列表
   * @returns 校验规则数组
   */
  protected _rules(): ValrFormRule[] {
    const rules: ValrFormRule[] = []
    let currentGroup: BaseDescriptor<T>[] = []

    this._descriptors.forEach((descriptor) => {
      if ('kind' in descriptor) {
        currentGroup.push(descriptor)
      }
      else {
        if (currentGroup.length) {
          rules.push(this._toRule(currentGroup))
          currentGroup = []
        }
        rules.push(descriptor)
      }
    })

    if (currentGroup.length) {
      rules.push(this._toRule(currentGroup))
    }

    return rules
  }

  /**
   * 获取校验规则
   * @returns 校验规则对象
   */
  getRules(): ValrFormRule[] {
    return this._rules()
  }

  /**
   * 获取 Element UI 校验规则
   * @returns 校验规则对象
   */
  getElRules(trigger?: ElFormTrigger): ElFormRule[] {
    return toAsyncValidatorRules(this._rules(), trigger)
  }

  /**
   * 验证输入值
   * @param value 输入值
   */
  validate(value: any, callback?: (error: boolean, message?: string) => void) {
    const rules = this.getElRules()
    const validator = new AsyncValidator({ value: rules })

    const validationPromise = new Promise<{ error: boolean, message?: string }>((resolve) => {
      validator.validate({ value }, { firstFields: true }, (errors) => {
        const error = !!errors
        const message = errors?.[0]?.message

        resolve({ error, message })

        if (callback) {
          callback(error, message)
        }
      })
    })

    return validationPromise
  }

  /**
   * 追加校验规则
   * @param rules 要追加的校验规则
   * @returns this
   */
  concat(...rules: ValrFormRule[]): this {
    this._descriptors.push(...rules)
    return this
  }

  /**
   * 添加自定义校验
   * @param validator 自定义校验函数
   * @returns this
   */
  custom(validator: (value: T, input: any) => string | undefined): this {
    this._addDescriptor({
      kind: 'custom',
      validator,
    })
    return this
  }

  /**
   * 设置字段为必填
   * @param message 自定义错误消息
   * @returns this
   */
  required(message?: string): this {
    this._addDescriptor({
      required: true,
      message: message || this._messages.required,
    })
    return this
  }

  /**
   * 设置字段为可选
   * @param whitelist 可选值白名单
   * @returns this
   */
  optional(whitelist: ((input: any) => boolean) | any[] = ['', undefined, null]): this {
    this._optional = typeof whitelist === 'function'
      ? whitelist
      : (input: any) => whitelist.includes(input)
    return this
  }
}

export default BaseSchema
