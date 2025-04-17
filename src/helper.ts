import type { BaseSchemaOptions, ElFormRule, ValrFormRule, ValrMessages } from './types'
import ArraySchema from './core/array'
import NumberSchema from './core/number'
import StringSchema from './core/string'
import { messages } from './utils/messages'

type SchemaType = StringSchema | NumberSchema | ArraySchema

const SchemaMap = {
  string: StringSchema,
  number: NumberSchema,
  array: ArraySchema,
}

export function addMethod(
  type: BaseSchemaOptions['type'],
  name: string,
  validator: (...args: any[]) => string | undefined,
) {
  const target = SchemaMap[type].prototype
  Object.defineProperty(target, name, {
    value(...payload: any[]) {
      return this.custom((_: any, input: any) => validator(input, ...payload))
    },
  })
}

export function setMessages(data: Partial<ValrMessages>) {
  Object.assign(messages, data)
}

export function schemaToRules(schema: Record<string, SchemaType>) {
  return Object.entries(schema).reduce((acc, [key, value]) => {
    acc[key] = value.getRules()
    return acc
  }, {} as Record<string, ValrFormRule[]>)
}

export function schemaToElRules(schema: Record<string, SchemaType>) {
  return Object.entries(schema).reduce((acc, [key, value]) => {
    acc[key] = value.getElRules()
    return acc
  }, {} as Record<string, ElFormRule[]>)
}
