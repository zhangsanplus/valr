import type { BaseDescriptor, BaseSchemaOptions, ValrMessage } from '../types'
import BaseSchema from './base'

class ArraySchema extends BaseSchema<any[]> {
  constructor(options: Omit<BaseSchemaOptions, 'type'>) {
    super({
      type: 'array',
      messages: options.messages,
    })
  }

  _test(descriptor: BaseDescriptor<any[]>, value: any[]) {
    if (descriptor.kind === 'min') {
      return value.length >= descriptor.value
    }
    else if (descriptor.kind === 'max') {
      return value.length <= descriptor.value
    }
    else if (descriptor.kind === 'range') {
      const [min, max] = descriptor.value
      return value.length >= min && value.length <= max
    }
    else if (descriptor.kind === 'len') {
      return value.length === descriptor.value
    }
    else if (descriptor.kind === 'includes') {
      return descriptor.value.every(item => value.includes(item))
    }
    else if (descriptor.kind === 'excludes') {
      return descriptor.value.every(item => !value.includes(item))
    }
    else if (descriptor.kind === 'unique') {
      return new Set(value).size === value.length
    }
    return true
  }

  /**
   * 数组长度
   * @param length 长度
   * @param message 错误信息
   * @returns this
   */
  len(length: number, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'len',
      value: length,
      message,
    })
    return this
  }

  /**
   * 数组最小长度
   * @param limit 最小长度
   * @param message 错误信息
   * @returns this
   */
  min(limit: number, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'min',
      value: limit,
      message,
    })
    return this
  }

  /**
   * 数组最大长度
   * @param limit 最大长度
   * @param message 错误信息
   * @returns this
   */
  max(limit: number, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'max',
      value: limit,
      message,
    })
    return this
  }

  /**
   * 数组范围
   * @param min 最小长度
   * @param max 最大长度
   * @param message 错误信息
   * @returns this
   */
  range(min: number, max: number, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'range',
      value: [min, max],
      message,
    })
    return this
  }

  /**
   * includes
   *  @param value 包含的值
   * @param message 错误信息
   * @returns this
   */
  includes(value: any, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'includes',
      value,
      message,
    })
    return this
  }

  /**
   * excludes
   * @param value 排除的值
   * @param message 错误信息
   * @returns this
   */
  excludes(value: any, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'excludes',
      value,
      message,
    })
    return this
  }

  /**
   * unique
   * @param message 错误信息
   * @returns this
   */
  unique(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'unique',
      message,
    })
    return this
  }
}

export default ArraySchema
