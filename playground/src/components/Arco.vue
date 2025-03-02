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
        <a-button type="primary" html-type="submit">Submit</a-button>
        <a-button @click="resetFields">Reset</a-button>
      </a-space>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { ArcoValidator as Valr } from 'valr'

const formRef = ref()
const form = reactive({
  name: '',
  password: '',
  password2: '',
  email: '',
  ip: '192.168.2.1',
  url: '',
});

const rules = computed(() => {
  return {
    name: Valr.string().required().dirtyWords('fuck').max(20).getRules(),
    password: Valr.string().required().password().getRules(),
    password2: Valr.string().required().equal(form.password).getRules(),
    email: Valr.string().optional().email().getRules(),
    ip: Valr.string().required().ip().getRules(),
    url: Valr.string().required().url().getRules(),
  }
})

const handleSubmit = (res: any) => {
  console.log('values:', res.values, '\nerrors:', res.errors)
}


const resetFields = () => {
  formRef.value?.resetFields()
}
</script>
