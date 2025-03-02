export default function isUrl(value: string) {
  try {
    // eslint-disable-next-line no-new
    new URL(value)
    return true
  }
  catch {
    return false
  }
}
