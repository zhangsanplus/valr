import type { BaseSchemaOptions, StringDescriptor, ValrMessage } from '../types'
import type { PasswordOptions } from '../utils/is-password'
import isByteLength from '../utils/is-byte-length'
import isValidEmail from '../utils/is-email'
import isValidIP from '../utils/is-ip'
import isPassword from '../utils/is-password'
import isValidUrl from '../utils/is-url'
import BaseSchema from './base'

class StringSchema<U> extends BaseSchema<string, U> {
  constructor(options: Omit<BaseSchemaOptions, 'type'>) {
    super({
      type: 'string',
      ui: options.ui,
      messages: options.messages,
    })
  }

  _test(descriptor: StringDescriptor, value: string) {
    if (descriptor.kind === 'regex') {
      return descriptor.regex.test(value)
    }
    else if (descriptor.kind === 'range') {
      const [min, max] = descriptor.value
      return value.length >= min && value.length <= max
    }
    else if (descriptor.kind === 'min') {
      return value.length >= descriptor.value
    }
    else if (descriptor.kind === 'max') {
      return value.length <= descriptor.value
    }
    else if (descriptor.kind === 'equal') {
      return value === descriptor.value
    }
    else if (descriptor.kind === 'contain') {
      return value.includes(descriptor.value)
    }
    else if (descriptor.kind === 'len') {
      return value.length === descriptor.value
    }
    else if (descriptor.kind === 'byteLen') {
      return isByteLength(value, descriptor.value)
    }
    else if (descriptor.kind === 'uppercase') {
      return value === value.toUpperCase()
    }
    else if (descriptor.kind === 'lowercase') {
      return value === value.toLowerCase()
    }
    else if (descriptor.kind === 'alphanumeric') {
      return /^[a-z0-9]+$/i.test(value)
    }
    else if (descriptor.kind === 'startsWith') {
      return value.startsWith(descriptor.value)
    }
    else if (descriptor.kind === 'endsWith') {
      return value.endsWith(descriptor.value)
    }
    else if (descriptor.kind === 'phone') {
      return /^1[3-9]\d{9}$/.test(value)
    }
    else if (descriptor.kind === 'email') {
      return isValidEmail(value)
    }
    else if (descriptor.kind === 'url') {
      return isValidUrl(value)
    }
    else if (descriptor.kind === 'ip') {
      return isValidIP(value, descriptor.value)
    }
    else if (descriptor.kind === 'password') {
      return isPassword(value, descriptor.value)
    }
    return true
  }

  /**
   * 正则
   * @param regex 正则表达式
   * @param message 错误信息
   * @returns this
   */
  regex(regex: RegExp, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'regex',
      regex,
      message,
    })
  }

  /**
   * 字符串长度范围
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
   * 字符串最小长度
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
   * 字符串最大长度
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
   * 字符串相等
   * @param str 相等字符串
   * @param message 错误信息
   * @returns this
   */
  equal(str: string, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'equal',
      value: str,
      message,
    })
  }

  /**
   * 字符串包含
   * @param str 包含字符串
   * @param message 错误信息
   * @returns this
   */
  contain(str: string, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'contain',
      value: str,
      message,
    })
  }

  /**
   * 字符串长度
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
   * 字节长度 (一个中文算3个字节)
   * @param limits 字节长度范围
   * @param message 错误信息
   * @returns this
   */
  byteLen(limits: [number, number], message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'byteLen',
      value: limits,
      message,
    })
  }

  /**
   * 字符串开头
   * @param str 开头字符串
   * @param message 错误信息
   * @returns this
   */
  startsWith(str: string, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'startsWith',
      value: str,
      message,
    })
  }

  /**
   * 字符串结尾
   * @param str 结尾字符串
   * @param message 错误信息
   * @returns this
   */
  endsWith(str: string, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'endsWith',
      value: str,
      message,
    })
  }

  /**
   * 字符串必须全部为大写字母
   * @param message 错误信息
   * @returns this
   */
  uppercase(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'uppercase',
      message,
    })
  }

  /**
   * 字符串必须全部为小写字母
   * @param message 错误信息
   * @returns this
   */
  lowercase(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'lowercase',
      message,
    })
  }

  /**
   * 字符串必须全部为字母或数字
   * @param message 错误信息
   * @returns this
   */
  alphanumeric(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'alphanumeric',
      message,
    })
  }

  /**
   * 手机号
   * @param message 错误信息
   * @returns this
   */
  phone(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'phone',
      message,
    })
  }

  /**
   * 邮箱
   * @param message 错误信息
   * @returns this
   */
  email(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'email',
      message,
    })
  }

  /**
   * url
   * @param message 错误信息
   * @returns this
   */
  url(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'url',
      message,
    })
  }

  /**
   * ip地址
   * @param message 错误信息
   * @returns this
   */
  ip(message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'ip',
      message,
    })
  }

  /**
   * 密码
   * @param options 密码校验选项
   * @param message 错误信息
   * @returns this
   */
  password(options?: PasswordOptions, message?: ValrMessage) {
    return this._addDescriptor({
      kind: 'password',
      message,
      value: options,
    })
  }
}

export default StringSchema
