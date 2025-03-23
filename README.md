# Valr

## 简介

`Valr` 是一个用于生成表单验证规则的 TypeScript 库。它提供了一系列验证规则，用于验证表单字段的值，并返回相应的验证规则对象。

## 特性

- 支持多种验证规则，包括必填项、可选项、长度限制、范围限制等。
- 提供了链式调用的方式，方便组合多个验证规则。
- 支持自定义错误提示信息。
- 支持 Element Plus 和 Arce Design 等常见的前端框架。

## 安装

你可以使用 npm 或 yarn 来安装 `valr`：

```bash
npm install valr
```

## 用法

```typescript
import Valr from 'valr'

const rules = {
  name: Valr.string().required().max(20).getRules(),
  age: Valr.number().required().min(18).max(60).getRules(),
  type: Valr.array().optional().max(3).getRules(),
  score: Valr.number().optional().decimal(2).range(0.01, 100, `范围 0.01 到 100`).getRules(),
}

const elRules = {
  name: Valr.string().required().max(20).getElRules(),
  age: Valr.number().required().min(18).max(60).getElRules(),
  type: Valr.array().optional().max(3).getElRules(),
  score: Valr.number().optional().decimal(2).range(0.01, 100, `范围 0.01 到 100`).getElRules(),
}
```

```html
<a-form :model="form" :rules="rules" ref="formRef">
  <a-form-item label="姓名" field="name" validate-trigger="blur">
    <a-input v-model="form.name"></a-input>
  </a-form-item>
  <a-form-item label="年龄" field="age" validate-trigger="blur">
    <a-input v-model="form.age"></a-input>
  </a-form-item>
</a-form>

<el-form :model="form" :rules="rules" ref="formRef">
  <el-form-item label="姓名" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model="form.age"></el-input>
  </el-form-item>
</el-form>
```

## 公共方法

### `getRules(): ValrFormRule[]`

- **描述**：获取验证规则对象。
- **返回值**：返回验证规则对象。

### `getElRules(): ElFormRule[]`

- **描述**：获取 ELementUI 验证规则对象。
- **返回值**：返回验证规则对象。

### `validate(value: any, callback?: (error: boolean, message?: string) => void): Promise<{error:Boolean, message?:string}>`

- **描述**：验证输入值。
- **参数**：
  - `callback`（可选）：验证结果回调。
- **返回值**：返回验证结果。

## `required(message?: ValrMessage): this`

- **描述**：设置验证规则为必填项。
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

## `optional(data: ((value: any) => boolean) | any[] = ['', undefined, null]): this`

- **描述**：设置验证规则为可选项。
- **参数**：
  - `data`（可选）：可选值的数组或判断函数。
- **返回值**：返回 `this`，以便链式调用。

## `custom(validator: (value: T, input: any) => string | undefined): this`
- **描述**：设置自定义验证规则。
- **参数**：
  - `fn`：验证函数，返回验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

## `concat(rule: ValrFormRule<U>): this`
- **描述**：合并验证规则。
- **参数**：
  - `rule`：要合并的验证规则对象。
- **返回值**：返回 `this`，以便链式调用。

## 数组验证规则

### `len(length: number, message?: ValrMessage): this`

- **描述**：验证数组的长度是否等于指定的 `length`。
- **参数**：
  - `length`：期望的数组长度。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `min(limit: number, message?: ValrMessage): this`

- **描述**：验证数组的最小长度是否符合要求。
- **参数**：
  - `limit`：最小长度限制。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `max(limit: number, message?: ValrMessage): this`

- **描述**：验证数组的最大长度是否符合要求。
- **参数**：
  - `limit`：最大长度限制。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `range(min: number, max: number, message?: ValrMessage): this`

- **描述**：验证数组的长度是否在指定的范围内。
- **参数**：
  - `min`：最小长度。
  - `max`：最大长度。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

## 数字验证规则

### `integer(message?: ValrMessage): this`

- **描述**：验证数字是否为整数。
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `decimal(digits: number, message?: ValrMessage): this`

- **描述**：验证数字是否为小数，且小数位数不超过指定的 `digits`。
- **参数**：
  - `digits`：小数位数。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `len(length: number, message?: ValrMessage): this`

- **描述**：验证数字的位数是否等于指定的 `length`。
- **参数**：
  - `length`：期望的数字位数。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `min(limit: number, message?: ValrMessage): this`

- **描述**：验证数字是否大于等于指定的 `limit`。
- **参数**：
  - `limit`：最小值限制。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `max(limit: number, message?: ValrMessage): this`

- **描述**：验证数字是否小于等于指定的 `limit`。
- **参数**：
  - `limit`：最大值限制。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `range(limits: [number, number], message?: ValrMessage): this`

- **描述**：验证数字是否在指定的范围内。
- **参数**：
  - `limits`：包含最小值和最大值的数组。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `positive(message?: ValrMessage): this`

- **描述**：验证数字是否为正数（大于零）。
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `nonnegative(message?: ValrMessage): this`

- **描述**：验证数字是否为非负数（大于或等于零）。
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `negative(message?: ValrMessage): this`

- **描述**：验证数字是否为负数（小于零）。
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `nonpositive(message?: ValrMessage): this`

- **描述**：验证数字是否为非正数（小于或等于零）。
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

## 字符串验证规则

### `len(length: number, message?: ValrMessage): this`

- **描述**：验证字符串的长度是否等于指定的 `length`。
- **参数**：
  - `length`：期望的字符串长度。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `min(limit: number, message?: ValrMessage): this`

- **描述**：验证字符串的最小长度是否大于或等于指定的 `limit`。
- **参数**：
  - `limit`：最小长度限制。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `max(limit: number, message?: ValrMessage): this`

- **描述**：验证字符串的最大长度是否小于或等于指定的 `limit`。
- **参数**：
  - `limit`：最大长度限制。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `range(limits: [number, number], message?: ValrMessage): this`

- **描述**：验证字符串的长度是否在指定的范围内。
- **参数**：
  - `limits`：包含最小长度和最大长度的数组。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `startsWith(str: string, message?: ValrMessage): this`

- **描述**：验证字符串是否以指定的 `str` 开头。
- **参数**：
  - `str`：要验证的开头字符串。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `endsWith(str: string, message?: ValrMessage): this`

- **描述**：验证字符串是否以指定的 `str` 结尾。
- **参数**：
  - `str`：要验证的结尾字符串。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `byteLen(limits: [number, number], message?: ValrMessage): this`

- **描述**：验证字符串的字节长度是否在指定范围内。一个中文字符算作 3 个字节。
- **参数**：
  - `limits`：包含最小字节数和最大字节数的数组。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `phone(message?: ValrMessage): this`

- **描述**：验证字符串是否为有效的手机号。
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `email(message?: ValrMessage): this`

- **描述**：验证字符串是否为有效的邮箱地址。
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `url(message?: ValrMessage): this`

- **描述**：验证字符串是否为有效的 URL 地址。
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `ip(message?: ValrMessage): this`

- **描述**：验证字符串是否为有效的 IP 地址。
- **参数**：
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

### `regex(regex: RegExp, message?: ValrMessage): this`

- **描述**：验证字符串是否符合指定的正则表达式。
- **参数**：
  - `regex`：要验证的正则表达式。
  - `message`（可选）：验证失败时的错误提示信息。
- **返回值**：返回 `this`，以便链式调用。

## 扩展方法

支持自定义全局验证规则，允许和内置规则一起使用。

```typescript
// main.ts
import { addMethod } from 'valr'

addMethod('string', 'dirtyWords', (input, name) => {
  if (input === name) {
    return `不能输入${name}`
  }
})
```

```typescript
// global.d.ts
declare module 'valr' {
  interface StringSchema {
    dirtyWords: (name: string) => this
  }
}
```

```typescript
import Valr from 'valr'

const rules = {
  say: Valr.string().dirtyWords('fuck').getRules(),
}
```

## 国际化
```typescript
import { setLocale } from 'Valr'

setLocale({
  required: '请输入{field}',
  string: {
    // min: '最小长度为{min}',
    // ...
  },
  number: {
    // min: '最小值为{min}',
    // ...
  },
  array: {
    // min: '最小长度为{min}',
    // ...
  }
})
```
