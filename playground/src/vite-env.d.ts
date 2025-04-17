/// <reference types="vite/client" />

import 'valr'

declare module 'valr' {
  interface StringSchema {
    /**
     * 校验是否为脏词
     * @param value 校验值
     */
    say: (value: string) => this
  }
}
