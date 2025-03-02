import type { BaseSchemaOptions, ValrMessages } from './types'
import type { DeepPartial } from './utils/merge'
import ArcoValidator from './arco-design'
import ArraySchema from './core/array'
import NumberSchema from './core/number'
import StringSchema from './core/string'
import ElementValidator from './element-ui'
import deepMerge from './utils/merge'
import { messages } from './utils/messages'

const Schema = {
  string: StringSchema,
  number: NumberSchema,
  array: ArraySchema,
}

export function addMethod(
  type: BaseSchemaOptions['type'],
  method: string,
  check: (...args: any[]) => string | undefined,
) {
  const target = Schema[type].prototype
  Object.defineProperty(target, method, {
    value(...payload: any[]) {
      return this.custom(
        (_: any, input: any) => check(input, ...payload),
      )
    },
  })
}

export function setLocal(data: DeepPartial<ValrMessages>) {
  deepMerge(messages, data)
}

export {
  ArcoValidator,
  ArraySchema,
  ElementValidator,
  NumberSchema,
  StringSchema,
}
