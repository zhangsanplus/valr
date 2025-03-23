import type { BaseDescriptor, BaseSchemaOptions, ValrMessage } from '../types'
import isDecimal from '../utils/is-decimal'
import isInteger from '../utils/is-integer'
import isPort from '../utils/is-port'
import BaseSchema from './base'

class NumberSchema extends BaseSchema<number> {
  constructor(options: Omit<BaseSchemaOptions, 'type'>) {
    super({
      type: 'number',
      messages: options.messages,
    })
  }

  _test(descriptor: BaseDescriptor<number>, value: number) {
    if (descriptor.kind === 'integer') {
      return isInteger(value)
    }
    else if (descriptor.kind === 'decimal') {
      return isDecimal(value, descriptor.value)
    }
    else if (descriptor.kind === 'range') {
      const [min, max] = descriptor.value
      return value >= min && value <= max
    }
    else if (descriptor.kind === 'min') {
      return value >= descriptor.value
    }
    else if (descriptor.kind === 'max') {
      return value <= descriptor.value
    }
    else if (descriptor.kind === 'gt') {
      return value > descriptor.value
    }
    else if (descriptor.kind === 'lt') {
      return value < descriptor.value
    }
    else if (descriptor.kind === 'equal') {
      return value === descriptor.value
    }
    else if (descriptor.kind === 'positive') {
      return value > 0
    }
    else if (descriptor.kind === 'nonnegative') {
      return value >= 0
    }
    else if (descriptor.kind === 'negative') {
      return value < 0
    }
    else if (descriptor.kind === 'nonpositive') {
      return value <= 0
    }
    else if (descriptor.kind === 'port') {
      return isPort(value)
    }
    return true
  }

  /**
   * 整数
   * @param message 错误信息
   * @returns this
   */
  integer(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'integer',
      message,
    })
    return this
  }

  /**
   * 小数位数
   * @param digits 小数位数
   * @param message 错误信息
   * @returns this
   */
  decimal(digits: number, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'decimal',
      value: digits,
      message,
    })
    return this
  }

  /**
   * 数字范围
   * @param limits 范围 [min, max]
   * @param message 错误信息
   * @returns this
   */
  range(limits: [number, number], message?: ValrMessage) {
    this._addDescriptor({
      kind: 'range',
      value: limits,
      message,
    })
    return this
  }

  /**
   * 最小值
   * @param limit 最小值
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
   * 最大值
   * @param limit 最大值
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
   * 大于
   * @param value 大于的值
   * @param message 错误信息
   * @returns this
   */
  gt(value: number, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'gt',
      value,
      message,
    })
    return this
  }

  /**
   * 大于等于
   * @param value 大于等于的值
   * @param message 错误信息
   * @returns this
   */
  gte(value: number, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'min',
      value,
      message,
    })
    return this
  }

  /**
   * 小于
   * @param value 小于的值
   * @param message 错误信息
   * @returns this
   */
  lt(value: number, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'lt',
      value,
      message,
    })
    return this
  }

  /**
   * 小于等于
   * @param value 小于等于的值
   * @param message 错误信息
   * @returns this
   */
  lte(value: number, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'max',
      value,
      message,
    })
    return this
  }

  /**
   * 等于
   * @param value 等于的值
   * @param message 错误信息
   * @returns this
   */
  equal(value: number, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'equal',
      value,
      message,
    })
    return this
  }

  /**
   * 正负数
   * @param message 错误信息
   * @returns this
   */
  positive(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'positive',
      message,
    })
    return this
  }

  /**
   * 非正负数
   * @param message 错误信息
   * @returns this
   */
  nonnegative(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'nonnegative',
      message,
    })
    return this
  }

  /**
   * 负数
   * @param message 错误信息
   * @returns this
   */
  negative(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'negative',
      message,
    })
    return this
  }

  /**
   * 非负数
   * @param message 错误信息
   * @returns this
   */
  nonpositive(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'nonpositive',
      message,
    })
    return this
  }

  /**
   * 端口号
   * @param message 错误信息
   * @returns this
   */
  port(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'port',
      message,
    })
    return this
  }
}

export default NumberSchema
