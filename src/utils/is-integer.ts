const isInteger: NumberConstructor['isInteger'] = typeof Number.isInteger === 'function'
  ? val => Number.isInteger(val)
  : val => typeof val === 'number' && Number.isFinite(val) && Math.floor(val) === val

export default isInteger
