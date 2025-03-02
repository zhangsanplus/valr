// 国际化方案：https://github.com/validatorjs/validator.js/blob/master/src/lib/isFloat.js
export default function isDecimal(input: number, limit: number): boolean {
  const decimalPart = input.toString().split('.')[1]
  return decimalPart ? decimalPart.length > limit : false
}
