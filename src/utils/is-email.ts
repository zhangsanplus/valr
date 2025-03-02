// eslint-disable-next-line regexp/no-unused-capturing-group
const emailRegex = /^(?!\.)(?!.+\.\.)([\w'+\-.]*)[\w+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i

export default function isValidEmail(email: string) {
  return emailRegex.test(email)
}
