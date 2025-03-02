import deepMerge from './merge'

const upperCaseRegex = /^[A-Z]$/
const lowerCaseRegex = /^[a-z]$/
const numberRegex = /^\d$/
const symbolRegex = /^[-#!$@£%^&*()_+|~=`{}[\]:";'<>?,./\\ ]$/

export interface PasswordOptions {
  /**
   * 最小长度
   */
  minLength?: number
  /**
   * 最小小写字母数量
   */
  minLowercase?: number
  /**
   * 最小大写字母数量
   */
  minUppercase?: number
  /**
   * 最小数字数量
   */
  minNumbers?: number
  /**
   * 最小特殊字符数量
   */
  minSymbols?: number
}

const defaultOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
}

function countChars(str: string) {
  const result: Record<string, number> = {}
  Array.from(str).forEach((char) => {
    const curVal = result[char]
    if (curVal) {
      result[char] += 1
    }
    else {
      result[char] = 1
    }
  })
  return result
}

function analyzePassword(password: string) {
  const charMap = countChars(password)
  const analysis = {
    length: password.length,
    uniqueChars: Object.keys(charMap).length,
    uppercaseCount: 0,
    lowercaseCount: 0,
    numberCount: 0,
    symbolCount: 0,
  }
  Object.keys(charMap).forEach((char) => {
    /* istanbul ignore else */
    if (upperCaseRegex.test(char)) {
      analysis.uppercaseCount += charMap[char]
    }
    else if (lowerCaseRegex.test(char)) {
      analysis.lowercaseCount += charMap[char]
    }
    else if (numberRegex.test(char)) {
      analysis.numberCount += charMap[char]
    }
    else if (symbolRegex.test(char)) {
      analysis.symbolCount += charMap[char]
    }
  })
  return analysis
}

/**
 * 密码强度校验
 * https://github.com/validatorjs/validator.js/blob/master/src/lib/isStrongPassword.js
 * @param str 待校验的密码
 * @param options 校验选项
 * @returns 校验结果
 */
export default function isPassword(str: string, options?: PasswordOptions) {
  const opts = deepMerge(defaultOptions, options || {})

  const analysis = analyzePassword(str)
  return analysis.length >= opts.minLength
    && analysis.lowercaseCount >= opts.minLowercase
    && analysis.uppercaseCount >= opts.minUppercase
    && analysis.numberCount >= opts.minNumbers
    && analysis.symbolCount >= opts.minSymbols
}
