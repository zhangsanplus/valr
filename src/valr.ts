import ArraySchema from './core/array'
import NumberSchema from './core/number'
import StringSchema from './core/string'
import { messages } from './utils/messages'

const options = { messages } as const

class Valr {
  static string() {
    return new StringSchema(options)
  }

  static number() {
    return new NumberSchema(options)
  }

  static array() {
    return new ArraySchema(options)
  }
}

export default Valr
