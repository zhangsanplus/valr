import type { IpVersion } from './utils/is-ip'
import type { PasswordOptions } from './utils/is-password'
import type { messages } from './utils/messages'

export type ElFormTrigger = 'change' | 'blur' | ('change' | 'blur')[]
export type ElFormValidator = (_: any, value: any, callback: (error?: Error) => void) => void
export interface ElFormRule {
  validator?: ElFormValidator
  type?: 'string' | 'number' | 'array'
  trigger?: ElFormTrigger
  required?: boolean
  message?: ValrMessage
  min?: number
  max?: number
}

type ValrFormValidator = (value: any, callback: (error?: string) => void) => void
export interface ValrFormRule {
  validator?: ValrFormValidator
  type?: 'string' | 'number' | 'array'
  required?: boolean
  message?: string
  min?: number
  max?: number
}

export type ValrMessages = typeof messages
export type ValrMessage = string | ((...args: any[]) => string)

export interface BaseSchemaOptions {
  messages: ValrMessages
  type: 'string' | 'number' | 'array'
}

export type CommonDescriptor<T> =
  | { kind: 'custom', validator: (value: T, input: any) => string | undefined }
  | { kind: 'min', value: number, message?: ValrMessage }
  | { kind: 'max', value: number, message?: ValrMessage }
  | { kind: 'range', value: [number, number], message?: ValrMessage }

export type NumberDescriptor =
  | { kind: 'integer', message?: ValrMessage }
  | { kind: 'float', value: number, message?: ValrMessage }
  | { kind: 'equal', value: number, message?: ValrMessage }
  | { kind: 'gt', value: number, message?: ValrMessage }
  | { kind: 'lt', value: number, message?: ValrMessage }
  | { kind: 'positive', message?: ValrMessage }
  | { kind: 'nonnegative', message?: ValrMessage }
  | { kind: 'negative', message?: ValrMessage }
  | { kind: 'nonpositive', message?: ValrMessage }
  | { kind: 'port', message?: ValrMessage }

export type StringDescriptor =
  | { kind: 'len', value: number, message?: ValrMessage }
  | { kind: 'byteLen', value: [number, number], message?: ValrMessage }
  | { kind: 'contain', value: string, message?: ValrMessage }
  | { kind: 'equal', value: string, message?: ValrMessage }
  | { kind: 'regex', regex: RegExp, message?: ValrMessage }
  | { kind: 'startsWith', value: string, message?: ValrMessage }
  | { kind: 'endsWith', value: string, message?: ValrMessage }
  | { kind: 'uppercase', message?: ValrMessage }
  | { kind: 'lowercase', message?: ValrMessage }
  | { kind: 'alphanumeric', message?: ValrMessage }
  | { kind: 'email', message?: ValrMessage }
  | { kind: 'phone', message?: ValrMessage }
  | { kind: 'url', message?: ValrMessage }
  | { kind: 'ip', value?: IpVersion, message?: ValrMessage }
  | { kind: 'password', value?: PasswordOptions, message?: ValrMessage }

export type ArrayDescriptor =
  | { kind: 'len', value: number, message?: ValrMessage }
  | { kind: 'includes', value: any[], message?: ValrMessage }
  | { kind: 'excludes', value: any[], message?: ValrMessage }
  | { kind: 'unique', message?: ValrMessage }

export type TypeDescriptor<T> = T extends string
  ? StringDescriptor
  : (T extends number ? NumberDescriptor : ArrayDescriptor)

export type BaseDescriptor<T> = TypeDescriptor<T> | CommonDescriptor<T>

export type RuleDescriptor<T> = TypeDescriptor<T> | CommonDescriptor<T> | ValrFormRule

export interface Valr {
  string: StringDescriptor
  number: NumberDescriptor
  array: ArrayDescriptor
}
