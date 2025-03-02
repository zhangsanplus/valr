/// <reference types="vite/client" />

import 'valr'

declare module 'valr' {
  interface StringSchema {
    dirtyWords: (value: string) => this
  }
}
