import type { BaseDescriptor, BaseSchemaOptions, ValrRule, ValrTrigger } from '../types'
import { generateMessage } from '../utils/messages'

abstract class BaseSchema<T, U> {
  private _ui: BaseSchemaOptions['ui']
  private _type: BaseSchemaOptions['type']
  private _messages: BaseSchemaOptions['messages']
  private _descriptors: (BaseDescriptor<T> | ValrRule<U>)[] = []
  private _optional: null | ((value: any) => boolean) = null

  constructor(options: BaseSchemaOptions) {
    this._messages = options.messages
    this._type = options.type
    this._ui = options.ui
  }

  /**
   * 校验函数
   * @param descriptor 校验配置
   * @param value 校验值
   * @returns boolean 是否校验通过
   */
  abstract _test(descriptor: BaseDescriptor<T>, value: T, input: any): boolean

  /**
   * 获取错误消息
   * @param descriptor 校验配置
   * @returns string 错误消息
   */
  private _getMessage(descriptor: BaseDescriptor<T>) {
    const { kind, message, value } = descriptor as any
    if (message && typeof message === 'function') {
      return message(value)
    }
    if (message) {
      return message
    }

    const defaultMessage = (this._messages[this._type] as any)[kind] ?? this._messages.default
    return generateMessage(
      defaultMessage,
      Array.isArray(value) ? value : [value],
    )
  }

  /**
   *  添加校验信息
   * @param descriptor 校验配置
   * @returns this
   */
  protected _addDescriptor(descriptor: BaseDescriptor<T> | ValrRule<U>) {
    this._descriptors.push(descriptor)
    return this
  }

  /**
   * 校验函数
   * @param descriptors 校验配置
   * @param value 校验值
   * @returns 错误消息
   */
  protected _validator(descriptors: BaseDescriptor<T>[], value: any): string | undefined {
    const input = value
    if (this._optional && this._optional(input)) {
      return
    }

    if (this._type === 'string' && typeof value !== 'string') {
      value = String(value)
    }
    else if (this._type === 'number' && typeof value !== 'number') {
      value = Number(value)
      if (Number.isNaN(value)) {
        return this._messages.types.number
      }
    }
    else if (this._type === 'array') {
      if (!Array.isArray(value)) {
        return this._messages.types.array
      }
    }

    for (const descriptor of descriptors) {
      if (descriptor.kind === 'custom') {
        const errorMessage = descriptor.validator(value, input)
        if (errorMessage) {
          return errorMessage
        }
      }
      else {
        const isValid = this._test(descriptor, value, input)
        if (!isValid) {
          return this._getMessage(descriptor)
        }
      }
    }
  }

  /**
   * 转换为表单校验规则
   * @param descriptors 校验配置
   * @returns ValrRule<U>
   */
  protected _toRule(descriptors: BaseDescriptor<T>[]): ValrRule<U> {
    return {
      type: this._type,
      validator: (...args: any[]) => {
        const [value, callback] = this._ui === 'ele' ? args.slice(1) : args
        const errorMessage = this._validator(descriptors, value)
        if (errorMessage) {
          callback(this._ui === 'ele' ? new Error(errorMessage) : errorMessage)
        }
        else {
          callback()
        }
      },
    }
  }

  /**
   * 获取表单校验规则
   * @param trigger 触发事件
   * @returns ValrRule<U>[]
   */
  getRules(trigger?: ValrTrigger<U>): ValrRule<U>[] {
    const rules: ValrRule<U>[] = []
    let descriptors: BaseDescriptor<T>[] = []

    this._descriptors.forEach((descriptor) => {
      if ('kind' in descriptor) {
        descriptors.push(descriptor)
      }
      else {
        if (descriptors.length > 0) {
          const rule = this._toRule(descriptors)
          rules.push(rule)
          descriptors = []
        }
        rules.push(descriptor)
      }
    })

    if (descriptors.length > 0) {
      const rule = this._toRule(descriptors)
      rules.push(rule)
      descriptors = []
    }

    if (this._ui === 'ele') {
      return rules.map(rule => ({ trigger, ...rule }))
    }
    return rules
  }

  /**
   * 添加表单校验规则
   * @param rules 校验规则
   * @returns this
   */
  concat(...rules: ValrRule<U>[]) {
    this._descriptors.push(...rules)
    return this
  }

  /**
   * 自定义校验器
   * @param check 校验器，校验失败时需要返回错误信息字符串
   * @returns this
   */
  custom(check: (value: T, input: any) => string | undefined) {
    this._descriptors.push({
      kind: 'custom',
      validator: check,
    })
    return this
  }

  /**
   * 字段必填
   * @param message 错误信息
   * @returns this
   */
  required(message?: string) {
    return this._addDescriptor({
      required: true,
      message: message || this._messages.required,
    })
  }

  /**
   * 字段可选
   * @param whitelist 可选值列表
   * @returns this
   */
  optional(whitelist: ((input: any) => boolean) | any[] = ['', undefined, null]) {
    this._optional = typeof whitelist === 'function' ? whitelist : (input: any) => whitelist.includes(input)
    return this
  }
}

export default BaseSchema
