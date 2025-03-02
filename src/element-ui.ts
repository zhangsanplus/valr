import ArraySchema from './core/array'
import NumberSchema from './core/number'
import StringSchema from './core/string'
import { messages } from './utils/messages'

const options = { ui: 'ele', messages } as const

type ValrUI = typeof options.ui

class ElementValidator {
  static string() {
    return new StringSchema<ValrUI>(options)
  }

  static number() {
    return new NumberSchema<ValrUI>(options)
  }

  static array() {
    return new ArraySchema<ValrUI>(options)
  }
}

export default ElementValidator
