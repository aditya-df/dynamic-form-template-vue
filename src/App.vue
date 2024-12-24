<template>
  <DynamicForm :forms="forms" @submit="submit" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import DynamicForm from './components/forms/DynamicForm.vue'
import type { FormField, DynamicFormData } from '@/types/forms'

const forms = reactive<FormField[]>([
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Input value',
    disabled: false,
  },
  {
    id: 'age',
    label: 'Age',
    type: 'number',
    placeholder: 'Input value',
    disabled: false,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Input value',
    disabled: false,
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Input value',
    disabled: false,
  },
])

const submit = (data: DynamicFormData) => {
  console.log(data)
}
</script>
