// TextEncoder().encode(str) 会将字符串编码为 UTF-8 字节流。
// ASCII 字符（包括数字、英文字母和标点符号）占用 1 个字节。
// 非 ASCII 字符（如汉字、emoji 等）占用 3 个字节（或者更多，具体取决于字符本身）。

export default function isByteLength(value: string, options: [number, number]) {
  const [min, max] = options
  const encoder = new TextEncoder()
  const bytes = encoder.encode(value)
  return bytes.length < min || bytes.length > max
}
