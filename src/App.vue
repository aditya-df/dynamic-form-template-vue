<template>
  <div class="bg-gray-100 min-h-screen flex items-center py-12">
    <DynamicForm @submit="submit" />
  </div>
</template>

<script setup lang="ts">
import DynamicForm from './components/core/DynamicForm.vue'
import type { DynamicFormData } from '@/types/forms'

// const forms = reactive<FormField[]>([
//   {
//     id: 'name',
//     label: 'Name',
//     type: 'text',
//     placeholder: 'Input value',
//     disabled: false,
//   },
//   {
//     id: 'age',
//     label: 'Age',
//     type: 'number',
//     placeholder: 'Input value',
//     disabled: false,
//   },
//   // {
//   //   id: 'age',
//   //   label: 'Age',
//   //   type: 'range',
//   //   placeholder: 'Input value',
//   //   disabled: false,
//   //   min: 0,
//   //   max: 100,
//   //   step: 10,
//   // },
//   // {
//   //   id: 'birthday',
//   //   label: 'Birthday',
//   //   type: 'color',
//   //   placeholder: 'Input value',
//   //   disabled: false,
//   // },
//   // {
//   //   id: 'isAdmin',
//   //   label: 'Is Admin',
//   //   type: 'switch',
//   //   placeholder: 'Input value',
//   //   disabled: false,
//   // },
//   // {
//   //   id: 'email',
//   //   label: 'Email',
//   //   type: 'email',
//   //   placeholder: 'Input value',
//   //   disabled: false,
//   // },
//   // {
//   //   id: 'password',
//   //   label: 'Password',
//   //   type: 'password',
//   //   placeholder: 'Input value',
//   //   disabled: false,
//   // },
//   // {
//   //   id: 'description',
//   //   label: 'Description',
//   //   type: 'textarea',
//   //   placeholder: 'Input value',
//   //   disabled: false,
//   // },
//   {
//     id: 'hobby',
//     label: 'Hobby',
//     type: 'select',
//     placeholder: 'Input value',
//     disabled: false,
//     options: [
//       {
//         label: 'Football',
//         value: 'football',
//       },
//       {
//         label: 'Basketball',
//         value: 'basketball',
//       },
//       {
//         label: 'Tennis',
//         value: 'tennis',
//       },
//     ],
//   },
//   // {
//   //   id: 'userType',
//   //   label: 'User Type',
//   //   type: 'radio',
//   //   disabled: false,
//   //   options: [
//   //     {
//   //       label: 'Existing',
//   //       value: 'existing',
//   //     },
//   //     {
//   //       label: 'Newcomer',
//   //       value: 'newcomer',
//   //     },
//   //   ],
//   // },
//   // {
//   //   id: 'role',
//   //   label: 'Role',
//   //   type: 'checkbox',
//   //   direction: 'horizontal',
//   //   options: [
//   //     {
//   //       label: 'Admin',
//   //       value: 'admin',
//   //     },
//   //     {
//   //       label: 'Teacher',
//   //       value: 'teacher',
//   //     },
//   //   ],
//   // },
// ])

const submit = (data: DynamicFormData) => {
  console.log(data)
}
</script>
