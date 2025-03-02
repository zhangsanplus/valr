export type DeepPartial<T> = {
  [P in keyof T]?: T extends object ? DeepPartial<T[P]> : T[P]
}

export default function deepMerge<T extends object>(target: T, source: DeepPartial<T>): T {
  if (source) {
    for (const s in source) {
      if (Object.prototype.hasOwnProperty.call(source, s)) {
        const value = source[s]
        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = {
            ...target[s],
            ...value,
          }
        }
        else {
          target[s] = value as any
        }
      }
    }
  }
  return target
}
