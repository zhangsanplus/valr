<template>
  <h2>Arco Design</h2>
  <a-form ref="formRef" :rules="rules" :model="form" @submit="handleSubmit">
    <a-form-item field="name" label="Username" validate-trigger="blur">
      <a-input v-model="form.name" placeholder="please enter your username..." />
    </a-form-item>
    <a-form-item field="password" label="密码" validate-trigger="blur">
      <a-input-password v-model="form.password" placeholder="please enter your password..." />
    </a-form-item>
    <a-form-item field="password2" label="确认密码" validate-trigger="blur">
      <a-input-password v-model="form.password2" placeholder="please confirm your password..." />
    </a-form-item>
    <a-form-item field="email" label="email">
      <a-input v-model="form.email" placeholder="please enter your email..." />
    </a-form-item>
    <a-form-item field="ip" label="IP">
      <a-input v-model="form.ip" placeholder="please enter your ip..." />
    </a-form-item>
    <a-form-item field="url" label="URL">
      <a-input v-model="form.url" placeholder="please enter your url..." />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
        <a-button @click="resetFields">
          Reset
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<script lang="ts" setup>
import Valr, { schemaToRules } from 'valr'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const formRef = ref()
const form = reactive({
  name: '',
  password: '',
  password2: '',
  email: '',
  ip: '192.168.2.1',
  url: '',
})

const ValrSchema = computed(() => {
  return {
    name: Valr.string().required().say('hello').max(20),
    password: Valr.string().required().password(),
    password2: Valr.string().required().equal(form.password),
    email: Valr.string().optional().email(t('email')),
    ip: Valr.string().required().ip('v4'),
    url: Valr.string().required().url(),
  }
})

const rules = computed(() => schemaToRules(ValrSchema.value))

// 脱离表单组件，单独使用
ValrSchema.value.name.validate('fuck').then((res) => {
  console.log(res)
})

ValrSchema.value.email.validate('12345', (error, message) => {
  console.log(error, message)
})

// 表单提交
function handleSubmit(res: any) {
  console.log('values:', res.values, '\nerrors:', res.errors)
}

function resetFields() {
  formRef.value?.resetFields()
}
</script>
