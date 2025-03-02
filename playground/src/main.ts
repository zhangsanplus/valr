import ArcoVue from '@arco-design/web-vue'
import ElementPlus from 'element-plus'
import { addMethod, setLocal } from 'valr'
import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import '@arco-design/web-vue/dist/arco.css'

setLocal({
  required: '自定义必填',
  string: {
    len: '必须等于 {0}',
    min: '最小值为 {0}',
    max: '最大值为 {0}',
    range: '为 {0} 到 {1}',
    uppercase: '必须为大写',
    lowercase: '必须为小写',
    alphanumeric: '必须为字母或数字',
    email: '邮箱格式不正确',
    url: '链接格式不正确',
    ip: 'IP格式不正确',
    regex: '请输入正确的格式',
    startsWith: '必须以 {0} 开头',
    endsWith: '必须以 {0} 结尾',
    equal: '必须等于 {0}',
    contain: '必须包含 {0}',
    byteLen: '请输入 {0} 到 {1} 个字节',
    phone: '手机号格式不正确',
    password: '密码格式不正确',
  },
})

addMethod('string', 'dirtyWords', (input, name) => {
  if (input === name) {
    return `不能输入${input}`
  }
})

const app = createApp(App)
app.use(ElementPlus)
app.use(ArcoVue)
app.mount('#app')
