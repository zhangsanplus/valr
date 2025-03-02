import type { BaseSchemaOptions, NumberDescriptor, ValrMessage } from '../types'
import isDecimal from '../utils/is-decimal'
import isInteger from '../utils/is-integer'
import isPort from '../utils/is-port'
import BaseSchema from './base'

class NumberSchema<U> extends BaseSchema<number, U> {
  constructor(options: Omit<BaseSchemaOptions, 'type'>) {
    super({
      type: 'number',
      ui: options.ui,
      messages: options.messages,
    })
  }

  _test(descriptor: NumberDescriptor, value: number) {
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
    return this._addDescriptor({
      kind: 'integer',
      message,
    })
  }

  /**
   * 小数位数
   * @param digits 小数位数
   * @param message 错误信息
   * @returns this
   */
  decimal(digits: number, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'decimal',
      value: digits,
      message,
    })
  }

  /**
   * 数字范围
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

  /**
   * 最小值
   * @param limit 最小值
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
   * 最大值
   * @param limit 最大值
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
   * 大于
   * @param value 大于的值
   * @param message 错误信息
   * @returns this
   */
  gt(value: number, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'gt',
      value,
      message,
    })
  }

  /**
   * 大于等于
   * @param value 大于等于的值
   * @param message 错误信息
   * @returns this
   */
  gte(value: number, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'min',
      value,
      message,
    })
  }

  /**
   * 小于
   * @param value 小于的值
   * @param message 错误信息
   * @returns this
   */
  lt(value: number, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'lt',
      value,
      message,
    })
  }

  /**
   * 小于等于
   * @param value 小于等于的值
   * @param message 错误信息
   * @returns this
   */
  lte(value: number, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'max',
      value,
      message,
    })
  }

  /**
   * 等于
   * @param value 等于的值
   * @param message 错误信息
   * @returns this
   */
  equal(value: number, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'equal',
      value,
      message,
    })
  }

  /**
   * 正负数
   * @param message 错误信息
   * @returns this
   */
  positive(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'positive',
      message,
    })
  }

  /**
   * 非正负数
   * @param message 错误信息
   * @returns this
   */
  nonnegative(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'nonnegative',
      message,
    })
  }

  /**
   * 负数
   * @param message 错误信息
   * @returns this
   */
  negative(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'negative',
      message,
    })
  }

  /**
   * 非负数
   * @param message 错误信息
   * @returns this
   */
  nonpositive(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'nonpositive',
      message,
    })
  }

  /**
   * 端口号
   * @param message 错误信息
   * @returns this
   */
  port(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'port',
      message,
    })
  }
}

export default NumberSchema
