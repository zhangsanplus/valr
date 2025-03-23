<template>
  <div class="container">
    <div class="card">
      <Arco />
    </div>
    <div class="card">
      <Element />
    </div>
  </div>
  <button @click="switchLanguage">
    Switch Language {{ locale }}
  </button>
</template>

<script lang="ts" setup>
import { addMethod, setMessages } from 'valr'
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import Arco from './components/Arco.vue'
import Element from './components/Element.vue'

const { t, locale } = useI18n()

addMethod('string', 'dirtyWords', (input, name) => {
  if (input === name) {
    return t('notEqual', [input])
  }
})

watchEffect(() => {
  setMessages({
    'required': t('required'),
    'string.len': '必须等于 {0}',
    'string.min': '最小值为 {0}',
    'string.max': '最大值为 {0}',
    'string.range': '为 {0} 到 {1}',
    'string.uppercase': '必须为大写',
    'string.lowercase': '必须为小写',
    'string.alphanumeric': '必须为字母或数字',
    'string.email': '邮箱格式不正确',
    'string.url': '链接格式不正确',
    'string.ip': 'IP格式不正确',
    'string.regex': '请输入正确的格式',
    'string.startsWith': '必须以 {0} 开头',
    'string.endsWith': '必须以 {0} 结尾',
    'string.equal': '必须等于 {0}',
    'string.contain': '必须包含 {0}',
    'string.byteLen': '请输入 {0} 到 {1} 个字节',
    'string.phone': '手机号格式不正确',
    'string.password': '密码格式不正确',
  })
})

function switchLanguage() {
  locale.value = locale.value === 'en' ? 'zh' : 'en'
  localStorage.setItem('language', JSON.stringify(locale.value))
}
</script>

<style lang="css">
body {
  background-color: #f2f2f2;
}

.container {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 40px 30px;
}

.card {
  flex: 1;
  padding: 5px 20px 20px;
  background-color: #fff;
}
</style>
