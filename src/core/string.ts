import type { BaseDescriptor, BaseSchemaOptions, ValrMessage } from '../types'
import type { IpVersion } from '../utils/is-ip'
import type { PasswordOptions } from '../utils/is-password'
import isByteLength from '../utils/is-byte-length'
import isValidEmail from '../utils/is-email'
import isValidIP from '../utils/is-ip'
import isPassword from '../utils/is-password'
import isValidUrl from '../utils/is-url'
import BaseSchema from './base'

class StringSchema extends BaseSchema<string> {
  constructor(options: Omit<BaseSchemaOptions, 'type'>) {
    super({
      type: 'string',
      messages: options.messages,
    })
  }

  _test(descriptor: BaseDescriptor<string>, value: string) {
    if (descriptor.kind === 'min') {
      return value.length >= descriptor.value
    }
    else if (descriptor.kind === 'max') {
      return value.length <= descriptor.value
    }
    else if (descriptor.kind === 'regex') {
      return descriptor.regex.test(value)
    }
    else if (descriptor.kind === 'range') {
      const [min, max] = descriptor.value
      return value.length >= min && value.length <= max
    }
    else if (descriptor.kind === 'len') {
      return value.length === descriptor.value
    }
    else if (descriptor.kind === 'byteLen') {
      return isByteLength(value, descriptor.value)
    }
    else if (descriptor.kind === 'equal') {
      return value === descriptor.value
    }
    else if (descriptor.kind === 'contain') {
      return value.includes(descriptor.value)
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
    this._addDescriptor({
      kind: 'regex',
      regex,
      message,
    })
    return this
  }

  /**
   * 字符串长度范围
   * @param min 最小值
   * @param max 最大值
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
   * 字符串最小长度
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
   * 字符串最大长度
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
   * 字符串相等
   * @param str 相等字符串
   * @param message 错误信息
   * @returns this
   */
  equal(str: string, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'equal',
      value: str,
      message,
    })
    return this
  }

  /**
   * 字符串包含
   * @param str 包含字符串
   * @param message 错误信息
   * @returns this
   */
  contain(str: string, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'contain',
      value: str,
      message,
    })
    return this
  }

  /**
   * 字符串长度
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
   * 字节长度 (一个中文算3个字节)
   * @param min 最小字节长度
   * @param max 最大字节长度
   * @param message 错误信息
   * @returns this
   */
  byteLen(min: number, max: number, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'byteLen',
      value: [min, max],
      message,
    })
    return this
  }

  /**
   * 字符串开头
   * @param str 开头字符串
   * @param message 错误信息
   * @returns this
   */
  startsWith(str: string, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'startsWith',
      value: str,
      message,
    })
    return this
  }

  /**
   * 字符串结尾
   * @param str 结尾字符串
   * @param message 错误信息
   * @returns this
   */
  endsWith(str: string, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'endsWith',
      value: str,
      message,
    })
    return this
  }

  /**
   * 字符串必须全部为大写字母
   * @param message 错误信息
   * @returns this
   */
  uppercase(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'uppercase',
      message,
    })
    return this
  }

  /**
   * 字符串必须全部为小写字母
   * @param message 错误信息
   * @returns this
   */
  lowercase(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'lowercase',
      message,
    })
    return this
  }

  /**
   * 字符串必须全部为字母或数字
   * @param message 错误信息
   * @returns this
   */
  alphanumeric(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'alphanumeric',
      message,
    })
    return this
  }

  /**
   * 手机号
   * @param message 错误信息
   * @returns this
   */
  phone(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'phone',
      message,
    })
    return this
  }

  /**
   * 邮箱
   * @param message 错误信息
   * @returns this
   */
  email(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'email',
      message,
    })
    return this
  }

  /**
   * url
   * @param message 错误信息
   * @returns this
   */
  url(message?: ValrMessage) {
    this._addDescriptor({
      kind: 'url',
      message,
    })
    return this
  }

  /**
   * ip地址
   * @param version ip版本 v4/v6
   * @param message 错误信息
   * @returns this
   */
  ip(version?: IpVersion, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'ip',
      value: version,
      message,
    })
    return this
  }

  /**
   * 密码
   * @param options 密码校验选项
   * @param message 错误信息
   * @returns this
   */
  password(options?: PasswordOptions, message?: ValrMessage) {
    this._addDescriptor({
      kind: 'password',
      message,
      value: options,
    })
    return this
  }
}

export default StringSchema
