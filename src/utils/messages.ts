function newMessages() {
  return {
    default: '验证失败',
    required: '必填',
    types: {
      number: '必须为数字',
      array: '必须为数组',
    },
    number: {
      integer: '必须为整数',
      decimal: '最多保留{0}位小数',
      range: '输入范围为 {0} 到 {1}',
      min: '最小值为 {0}',
      max: '最大值为 {0}',
      gt: '必须大于 {0}',
      gte: '必须大于等于 {0}',
      lt: '必须小于 {0}',
      lte: '必须小于等于 {0}',
      equal: '必须等于 {0}',
      positive: '必须为正数',
      negative: '必须为负数',
      nonnegative: '必须为非负数',
      nonpositive: '必须为非正数',
    },
    string: {
      regex: '请输入正确的格式',
      range: '字符串长度为 {0} 到 {1}',
      min: '字符串长度最小值为 {0}',
      max: '字符串长度最大值为 {0}',
      equal: '字符串必须等于 {0}',
      contain: '字符串必须包含 {0}',
      len: '字符串长度必须等于 {0}',
      byteLen: '字符串长度为 {0} 到 {1} 个字节',
      startsWith: '字符串必须以 {0} 开头',
      endsWith: '字符串必须以 {0} 结尾',
      uppercase: '字符串必须全部为大写字母',
      lowercase: '字符串必须全部为小写字母',
      alphanumeric: '字符串必须全部为字母或数字',
      phone: '手机号格式不正确',
      email: '邮箱格式不正确',
      url: '链接格式不正确',
      ip: 'IP格式不正确',
      password: '密码格式不正确',
    },
    array: {
      range: '数组长度为 {0} 到 {1}',
      min: '数组长度最小为 {0}',
      max: '数组长度最大为 {0}',
      len: '数组长度必须等于 {0}',
    },
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
