import type { ElFormRule, ElFormTrigger, ValrFormRule } from '../types'

export function toAsyncValidatorRules(rules: ValrFormRule[], trigger?: ElFormTrigger): ElFormRule[] {
  return rules.map((rule) => {
    const { validator, ...rest } = rule
    if (!validator)
      return rule
    return {
      ...rest,
      validator: (_: any, value: any, callback: (error?: Error) => void) => {
        validator(value, (error?: string) => {
          error ? callback(new Error(error)) : callback()
        })
      },
    }
  }).map(rule => ({ trigger, ...rule }))
}
