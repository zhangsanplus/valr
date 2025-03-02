import type { ArrayDescriptor, BaseSchemaOptions, ValrMessage } from '../types'
import BaseSchema from './base'

class ArraySchema<U> extends BaseSchema<any[], U> {
  constructor(options: Omit<BaseSchemaOptions, 'type'>) {
    super({
      type: 'array',
      ui: options.ui,
      messages: options.messages,
    })
  }

  _test(descriptor: ArrayDescriptor, value: any[]) {
    if (descriptor.kind === 'range') {
      const [min, max] = descriptor.value
      return value.length >= min && value.length <= max
    }
    else if (descriptor.kind === 'min') {
      return value.length >= descriptor.value
    }
    else if (descriptor.kind === 'max') {
      return value.length <= descriptor.value
    }
    else if (descriptor.kind === 'len') {
      return value.length === descriptor.value
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
    return this._addDescriptor({
      kind: 'len',
      value: length,
      message,
    })
  }

  /**
   * 数组最小长度
   * @param limit 最小长度
   * @param message 错误信息
   * @returns this
   */
  min(limit: number, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'min',
      value: limit,
      message,
    })
  }

  /**
   * 数组最大长度
   * @param limit 最大长度
   * @param message 错误信息
   * @returns this
   */
  max(limit: number, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'max',
      value: limit,
      message,
    })
  }

  /**
   * 数组范围
   * @param limits 范围 [min, max]
   * @param message 错误信息
   * @returns this
   */
  range(limits: [number, number], message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'range',
      value: limits,
      message,
    })
  }
}

export default ArraySchema
