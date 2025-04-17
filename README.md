# Valr

## 简介

Valr 是一款轻量、灵活的 JavaScript 表单验证库，提供链式规则配置，简化前端表单验证逻辑。

## 特性

- 链式调用，方便组合多个验证规则
- 可脱离表单单独进行数据验证，使用更加灵活
- 支持多种验证规则，包括字符串、数字、数组等
- 支持扩展自定义验证规则，灵活应对不同场景
- 支持自定义错误提示信息，满足个性化需求
- 适配 Element Plus、Arco Design 等常见前端框架
- 提供友好的 TypeScript 类型提示

## 安装

你可以使用 npm 或 yarn 来安装 `valr`：

```bash
npm install valr
```

## 用法

1. 配合表单使用

```typescript
import Valr from 'valr'

const rules = {
  name: Valr.string().required().max(20).getRules(),
  age: Valr.number().required().min(18).max(60).getRules(),
  type: Valr.array().optional().max(3).getRules(),
  score: Valr.number().optional().float(2).range(0.01, 100, `范围 0.01 到 100`).getRules(),
}

const elRules = {
  name: Valr.string().required().max(20).getElRules(),
  age: Valr.number().required().min(18).max(60).getElRules(),
  type: Valr.array().optional().max(3).getElRules(),
  score: Valr.number().optional().float(2).range(0.01, 100, `范围 0.01 到 100`).getElRules(),
}
```

```html
<!-- Arco design -->
<a-form :model="form" :rules="rules" ref="formRef">
  <a-form-item label="姓名" field="name" validate-trigger="blur">
    <a-input v-model="form.name"></a-input>
  </a-form-item>
  <a-form-item label="年龄" field="age" validate-trigger="blur">
    <a-input v-model="form.age"></a-input>
  </a-form-item>
</a-form>

<!-- Element Plus -->
<el-form :model="form" :rules="rules" ref="formRef">
  <el-form-item label="姓名" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model="form.age"></el-input>
  </el-form-item>
</el-form>
```

2. 单独使用

```typescript
// Promise
const res = await Valr.string().required().max(15).validate('123456789012345678901')
console.log(res) // {error: true, message: '长度不能超过 15 个字符'}

// Callback
Valr.number().validate('1f00', (error, msg) => {
  console.log(error, msg) // false, 请输入数字
})
```

## 公共方法

### `getRules(): ValrFormRule[]`

- **描述**：获取验证规则对象
- **返回值**：返回验证规则对象

### `getElRules(): ElFormRule[]`

- **描述**：获取 ELementUI 验证规则对象
- **返回值**：返回验证规则对象

### `validate(value: any): Promise<{error:Boolean, message?:string}>`

- **描述**：验证输入值
  - `value`: 要验证的值
- **返回值**：返回验证结果

### `required(message?: ValrMessage): this`

- **描述**：设置验证规则为必填项
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `optional(value: (value: any) => boolean | any[])): this`

- **描述**：设置验证规则为可选项
- **参数**：
  - `value`（可选）：排除的值或验证函数，默认 ['', undefined, null]

### `custom(fn: (value: T, input: any) => string | undefined): this`

- **描述**：自定义验证规则
- **参数**：
  - `fn`：验证函数，验证失败时需返回错误信息

### `concat(rule: ValrFormRule<U>): this`

- **描述**：合并验证规则
- **参数**：
  - `rule`：要合并的验证规则对象

## 数字验证规则

### `len(length: number, message?: ValrMessage): this`

- **描述**：验证数字的位数是否等于指定的 `length`
- **参数**：
  - `length`：期望的数字位数
  - `message`（可选）：验证失败时的错误提示信息

### `min(limit: number, message?: ValrMessage): this`

- **描述**：验证数字是否大于等于指定的 `limit`
- **参数**：
  - `limit`：最小值
  - `message`（可选）：验证失败时的错误提示信息

### `max(limit: number, message?: ValrMessage): this`

- **描述**：验证数字是否小于等于指定的 `limit`
- **参数**：
  - `limit`：最大值
  - `message`（可选）：验证失败时的错误提示信息

### `range(min: number, max: number, message?: ValrMessage): this`

- **描述**：验证数字是否在指定的范围内
- **参数**：
  - `min`：最小值
  - `max`：最大值
  - `message`（可选）：验证失败时的错误提示信息

### `integer(message?: ValrMessage): this`

- **描述**：验证数字是否为整数
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `float(places: number, message?: ValrMessage): this`

- **描述**：验证数字是否为小数，且小数位数不超过指定的 `places`
- **参数**：
  - `places`：小数位数
  - `message`（可选）：验证失败时的错误提示信息

### `equal(value: number, message?: ValrMessage): this`

- **描述**：验证数字是否等于指定的 `value`
- **参数**：
  - `value`：期望的值
  - `message`（可选）：验证失败时的错误提示信息

### `gt(value: number, message?: ValrMessage): this`

- **描述**：验证数字是否大于指定的 `value`
- **参数**：
  - `value`：最小值
  - `message`（可选）：验证失败时的错误提示信息

### `lt(value: number, message?: ValrMessage): this`

- **描述**：验证数字是否小于指定的 `value`
- **参数**：
  - `value`：最大值
  - `message`（可选）：验证失败时的错误提示信息

### `positive(message?: ValrMessage): this`

- **描述**：验证数字是否为正数（大于零）
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `nonnegative(message?: ValrMessage): this`

- **描述**：验证数字是否为非负数（大于或等于零）
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `negative(message?: ValrMessage): this`

- **描述**：验证数字是否为负数（小于零）
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `nonpositive(message?: ValrMessage): this`

- **描述**：验证数字是否为非正数（小于或等于零）
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `port(message?: ValrMessage): this`

- **描述**：验证数字是否为有效的端口号
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

## 字符串验证规则

### `len(length: number, message?: ValrMessage): this`

- **描述**：验证字符串的长度是否等于指定的 `length`
- **参数**：
  - `length`：期望的字符串长度
  - `message`（可选）：验证失败时的错误提示信息

### `min(limit: number, message?: ValrMessage): this`

- **描述**：验证字符串的最小长度是否大于或等于指定的 `limit`
- **参数**：
  - `limit`：最小长度
  - `message`（可选）：验证失败时的错误提示信息

### `max(limit: number, message?: ValrMessage): this`

- **描述**：验证字符串的最大长度是否小于或等于指定的 `limit`
- **参数**：
  - `limit`：最大长度
  - `message`（可选）：验证失败时的错误提示信息

### `range(min: number, max: number, message?: ValrMessage): this`

- **描述**：验证字符串的长度是否在指定的范围内
- **参数**：
  - `min`：最小长度
  - `max`：最大长度
  - `message`（可选）：验证失败时的错误提示信息

### `byteLen(min: number, max: number, message?: ValrMessage): this`

- **描述**：验证字符串的字节长度是否在指定范围内一个中文字符算作 3 个字节
- **参数**：
  - `min`：最小字节长度
  - `max`：最大字节长度
  - `message`（可选）：验证失败时的错误提示信息

### `contain(value: string, message?: ValrMessage): this`

- **描述**：验证字符串是否包含指定的子字符串
- **参数**：
  - `value`：要包含的子字符串
  - `message`（可选）：验证失败时的错误提示信息

### `equal(value: string, message?: ValrMessage): this`

- **描述**：验证字符串是否等于指定的 `value`
- **参数**：
  - `value`：期望的值
  - `message`（可选）：验证失败时的错误提示信息

### `regex(regex: RegExp, message?: ValrMessage): this`

- **描述**：验证字符串是否符合指定的正则表达式
- **参数**：
  - `regex`：要验证的正则表达式
  - `message`（可选）：验证失败时的错误提示信息

### `startsWith(value: string, message?: ValrMessage): this`

- **描述**：验证字符串是否以指定的 `value` 开头
- **参数**：
  - `value`：要验证的开头字符串
  - `message`（可选）：验证失败时的错误提示信息

### `endsWith(value: string, message?: ValrMessage): this`

- **描述**：验证字符串是否以指定的 `value` 结尾
- **参数**：
  - `value`：要验证的结尾字符串
  - `message`（可选）：验证失败时的错误提示信息

### `uppercase(message?: ValrMessage): this`

- **描述**：验证字符串是否全为大写字母
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `lowercase(message?: ValrMessage): this`

- **描述**：验证字符串是否全为小写字母
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `alphanumeric(message?: ValrMessage): this`

- **描述**：验证字符串是否只包含字母和数字
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `email(message?: ValrMessage): this`

- **描述**：验证字符串是否为有效的邮箱地址
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `phone(message?: ValrMessage): this`

- **描述**：验证字符串是否为有效的手机号
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `url(message?: ValrMessage): this`

- **描述**：验证字符串是否为有效的 URL 地址
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

### `ip(version: IpVersion, message?: ValrMessage): this`

- **描述**：验证字符串是否为有效的 IP 地址
- **参数**：
  - `version`：IP 版本，支持 'v4' 和 'v6'
  - `message`（可选）：验证失败时的错误提示信息

### `password(value?: PasswordOptions，message?: ValrMessage): this`

- **描述**：验证字符串是否为有效的密码
- **参数**：
  - `value`: PasswordOptions
  - `message`（可选）：验证失败时的错误提示信息

## 数组验证规则

### `len(length: number, message?: ValrMessage): this`

- **描述**：验证数组的长度是否等于指定的 `length`
- **参数**：
  - `length`：期望的数组长度
  - `message`（可选）：验证失败时的错误提示信息

### `min(limit: number, message?: ValrMessage): this`

- **描述**：验证数组的最小长度是否符合要求
- **参数**：
  - `limit`：最小长度
  - `message`（可选）：验证失败时的错误提示信息

### `max(limit: number, message?: ValrMessage): this`

- **描述**：验证数组的最大长度是否符合要求
- **参数**：
  - `limit`：最大长度
  - `message`（可选）：验证失败时的错误提示信息

### `range(min: number, max: number, message?: ValrMessage): this`

- **描述**：验证数组的长度是否在指定的范围内
- **参数**：
  - `min`：最小长度
  - `max`：最大长度
  - `message`（可选）：验证失败时的错误提示信息

### `includes(value: any[], message?: ValrMessage): this`

- **描述**：验证数组是否包含指定的值
- **参数**：
  - `value`：要验证的值
  - `message`（可选）：验证失败时的错误提示信息

### `excludes(value: any[], message?: ValrMessage): this`

- **描述**：验证数组是否不包含指定的值
- **参数**：
  - `value`：要验证的值
  - `message`（可选）：验证失败时的错误提示信息

### `unique(message?: ValrMessage): this`

- **描述**：验证数组中的元素是否唯一
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息

## 扩展方法

支持自定义全局验证规则，允许和内置规则一起使用

```typescript
// main.ts
import { addMethod } from 'valr'

addMethod('string', 'say', (input, name) => {
  if (input !== name) {
    return `请说${name}`
  }
})
```

```typescript
// global.d.ts
declare module 'valr' {
  interface StringSchema {
    say: (name: string) => this
  }
}
```

```typescript
import Valr from 'valr'

const rules = {
  say: Valr.string().say('hello').getRules(),
}
```

## 国际化

```typescript
import { setLocale } from 'Valr'

setLocale({
  'required': '不能为空',
  'string.min': '最小长度为{0}',
  'string.max': '最大长度为{0}',
  'number.min': '最小值为{0}',
  'number.max': '最大值为{0}',
  'array.min': '最小长度为{0}',
  'array.max': '最大长度为{0}',
  // ...
})
```
