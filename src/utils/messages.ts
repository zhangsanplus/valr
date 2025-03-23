function newMessages() {
  return {
    'default': '验证失败',
    'required': '必填',
    'types.number': '必须为数字',
    'types.array': '必须为数组',
    'number.integer': '必须为整数',
    'number.decimal': '最多保留{0}位小数',
    'number.range': '输入范围为 {0} 到 {1}',
    'number.min': '最小值为 {0}',
    'number.max': '最大值为 {0}',
    'number.gt': '必须大于 {0}',
    'number.gte': '必须大于等于 {0}',
    'number.lt': '必须小于 {0}',
    'number.lte': '必须小于等于 {0}',
    'number.equal': '必须等于 {0}',
    'number.positive': '必须为正数',
    'number.negative': '必须为负数',
    'number.nonnegative': '必须为非负数',
    'number.nonpositive': '必须为非正数',
    'string.regex': '请输入正确的格式',
    'string.range': '字符串长度为 {0} 到 {1}',
    'string.min': '字符串长度最小值为 {0}',
    'string.max': '字符串长度最大值为 {0}',
    'string.equal': '字符串必须等于 {0}',
    'string.contain': '字符串必须包含 {0}',
    'string.len': '字符串长度必须等于 {0}',
    'string.byteLen': '字符串长度为 {0} 到 {1} 个字节',
    'string.startsWith': '字符串必须以 {0} 开头',
    'string.endsWith': '字符串必须以 {0} 结尾',
    'string.uppercase': '字符串必须全部为大写字母',
    'string.lowercase': '字符串必须全部为小写字母',
    'string.alphanumeric': '字符串必须全部为字母或数字',
    'string.phone': '手机号格式不正确',
    'string.email': '邮箱格式不正确',
    'string.url': '链接格式不正确',
    'string.ip': 'IP格式不正确',
    'string.password': '密码格式不正确',
    'array.range': '数组长度为 {0} 到 {1}',
    'array.min': '数组长度最小为 {0}',
    'array.max': '数组长度最大为 {0}',
    'array.len': '数组长度必须等于 {0}',
  }
}

export function generateMessage(
  message: string,
  value: (string | number)[] | Record<string, string | number> = [],
) {
  if (Array.isArray(value)) {
    return message.replace(/\{(\d+)\}/g, (match, number) => {
      const index = Number(number)
      return value[index]?.toString() ?? match
    })
  }
  return message.replace(/\{(\w+)\}/g, (match, key) => {
    return value[key]?.toString() ?? match
  })
}

export const messages = newMessages()
