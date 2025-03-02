import type { IpVersion } from './utils/is-ip'
import type { PasswordOptions } from './utils/is-password'
import type { messages } from './utils/messages'

type ElFormTrigger = 'change' | 'blur' | ('change' | 'blur')[]
type ElFormValidator = (_: any, value: any, callback: (error?: Error) => void) => void
interface ElFormRule {
  validator?: ElFormValidator
  type?: 'string' | 'number' | 'array'
  trigger?: ElFormTrigger
  required?: boolean
  message?: ValrMessage
  min?: number
  max?: number
}

type ArcoFormValidator = (value: any, callback: (error?: string) => void) => void
interface ArcoFormRule {
  validator?: ArcoFormValidator
  type?: 'string' | 'number' | 'array'
  required?: boolean
  message?: string
  min?: number
  max?: number
}

export type ValrMessages = typeof messages
export type ValrMessage<T = any> = string | ((value: T) => string)
export type ValrTrigger<U> = U extends 'ele' ? ElFormTrigger : never
export type ValrValidator<U> = U extends 'ele' ? ElFormValidator : ArcoFormValidator
export type ValrRule<U> = U extends 'ele' ? ElFormRule : ArcoFormRule

export interface BaseSchemaOptions {
  messages: ValrMessages
  type: 'string' | 'number' | 'array'
  ui: 'ele' | 'arco'
}

export type BaseDescriptor<T> = T extends string
  ? StringDescriptor
  : (T extends number ? NumberDescriptor : ArrayDescriptor)

type CommonDescriptor<T = any> =
  | { kind: 'custom', validator: (value: T, input: any) => string | undefined }
  | { kind: 'min', value: number, message?: ValrMessage }
  | { kind: 'max', value: number, message?: ValrMessage }
  | { kind: 'range', value: [number, number], message?: ValrMessage }

export type NumberDescriptor =
  | CommonDescriptor
  | { kind: 'integer', message?: ValrMessage }
  | { kind: 'decimal', value: number, message?: ValrMessage }
  | { kind: 'equal', value: number, message?: ValrMessage }
  | { kind: 'gt', value: number, message?: ValrMessage }
  | { kind: 'lt', value: number, message?: ValrMessage }
  | { kind: 'positive', message?: ValrMessage }
  | { kind: 'nonnegative', message?: ValrMessage }
  | { kind: 'negative', message?: ValrMessage }
  | { kind: 'nonpositive', message?: ValrMessage }
  | { kind: 'port', message?: ValrMessage }

export type StringDescriptor =
  | CommonDescriptor
  | { kind: 'regex', regex: RegExp, message?: ValrMessage }
  | { kind: 'equal', value: string, message?: ValrMessage }
  | { kind: 'contain', value: string, message?: ValrMessage }
  | { kind: 'len', value: number, message?: ValrMessage }
  | { kind: 'byteLen', value: [number, number], message?: ValrMessage }
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
  | CommonDescriptor
  | { kind: 'len', value: number, message?: ValrMessage }
