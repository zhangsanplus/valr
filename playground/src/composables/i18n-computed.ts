import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * 感知国际化变化的计算属性
 * @description 当 computed 中没有使用到国际化的内容时，会导致 computed 无法感知到国际化变化
 * 此函数可以解决这个问题
 * @param getter 计算属性的回调函数
 */
export function i18nComputed<T>(getter: () => T) {
  const { locale } = useI18n()
  return computed(() => {
    // eslint-disable-next-line ts/no-unused-expressions
    locale.value
    return getter()
  })
}
