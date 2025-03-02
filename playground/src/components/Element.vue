<template>
  <h2>Element Plus</h2>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="form.age" />
    </el-form-item>
    <el-form-item label="成绩" prop="score">
      <el-input v-model="form.score" />
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox value="Online activities" name="type">
          Online activities
        </el-checkbox>
        <el-checkbox value="Promotion activities" name="type">
          Promotion activities
        </el-checkbox>
        <el-checkbox value="Offline activities" name="type">
          Offline activities
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio value="Sponsor">Sponsor</el-radio>
        <el-radio value="Venue">Venue</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
  {{ form }}
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElementValidator as Validator } from 'valr'

const formRef = ref()
const form = reactive({
  name: '',
  age: '',
  score: '',
  type: [],
  resource: '',
  email: '',
})

const rules = {
  name: Validator.string().required().max(20).getRules(),
  age: Validator.number().required().decimal(2).range([0.01, 100], `范围 0.01 到 100`).getRules(),
  score: Validator.string().optional().getRules(),
  email: Validator.string().required().email().getRules(),
  type: Validator.array().min(2).custom((value) => {
    if (value.length > 0 && !value.includes('Promotion activities')) {
      return '记得选择 Promotion activities'
    }
  }).getRules(),
}

const onSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('submit!')
    }
  })
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>
