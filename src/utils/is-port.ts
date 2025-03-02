import isInteger from './is-integer'

export default function isPort(str: number) {
  return isInteger(str) && Number(str) >= 0 && Number(str) <= 65535
}
