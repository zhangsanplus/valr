import ArcoVue from '@arco-design/web-vue'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import 'element-plus/dist/index.css'
import '@arco-design/web-vue/dist/arco.css'

const app = createApp(App)
app.use(i18n)
app.use(ElementPlus)
app.use(ArcoVue)
app.mount('#app')
