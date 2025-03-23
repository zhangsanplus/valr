import type { BaseSchemaOptions, ValrMessages } from './types'
import ArraySchema from './core/array'
import NumberSchema from './core/number'
import StringSchema from './core/string'
import { messages } from './utils/messages'

const Schema = {
  string: StringSchema,
  number: NumberSchema,
  array: ArraySchema,
}

export function addMethod(
  type: BaseSchemaOptions['type'],
  method: string,
  validator: (...args: any[]) => string | undefined,
) {
  const target = Schema[type].prototype
  Object.defineProperty(target, method, {
    value(...payload: any[]) {
      return this.custom(
        (_: any, input: any) => validator(input, ...payload),
      )
    },
  })
}

export function setMessages(data: Partial<ValrMessages>) {
  Object.assign(messages, data)
}
