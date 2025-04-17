import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    range: 'Range: {0} to {1}',
    required: 'This field is required ~~',
    email: 'Please enter a valid email address ~~',
    input: 'Please input {0}',
  },
  zh: {
    range: '范围：{0} 到 {1}',
    required: '这是必填项 ~~',
    email: '请输入有效的电子邮件地址 ~~',
    input: '请输入 {0}',
  },
}

const i18n = createI18n({
  messages,
  legacy: false,
  locale: getLocalStorage('language'),
})

function getLocalStorage(key: string) {
  const storedValue = localStorage.getItem(key)
  return storedValue ? JSON.parse(storedValue) : 'en'
}

export default i18n
