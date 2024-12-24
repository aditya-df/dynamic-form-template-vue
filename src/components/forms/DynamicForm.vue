<template>
  <form
    class="mx-auto my-20 shadow-md px-10 py-6 border rounded max-w-3xl grid gap-4"
    @submit.prevent="submit"
  >
    <template v-for="form in modifiedForms" :key="form.field.id">
      <component
        :is="form.component"
        v-bind="form"
        v-model="form.value"
        @change="removeError(form)"
      />
    </template>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { shallowRef, onMounted } from 'vue'
import type { FormField, FormFieldModel } from '@/types/forms'

import TheInput from './TheInput.vue'

const props = defineProps<{
  forms: FormField[]
}>()

const modifiedForms = shallowRef<FormFieldModel[]>()

onMounted(() => {
  modifiedForms.value = props.forms.map((form) => {
    return {
      field: form,
      component: decideComponent(form),
      value: null,
    }
  })
})

const decideComponent = (form: FormField) => {
  if (form.type === 'text') {
    return TheInput
  }
  return TheInput
}

const emit = defineEmits(['submit'])

const removeError = (form: FormFieldModel) => {
  if (!modifiedForms.value) return

  modifiedForms.value = modifiedForms.value.map((f) => {
    if (f.field.id === form.field.id) {
      return {
        ...f,
        field: { ...f.field, error: false },
      }
    }
    return f
  })
}

const submit = () => {
  if (!modifiedForms.value) return

  if (modifiedForms.value.some((form) => !form.value)) {
    return (modifiedForms.value = modifiedForms.value.map((form) => {
      if (!form.value) {
        return {
          ...form,
          field: { ...form.field, error: true },
        }
      }
      return form
    }))
  }

  emit(
    'submit',
    modifiedForms.value.map((form) => {
      return { [form.field.id]: form.value }
    }),
  )
}
</script>
