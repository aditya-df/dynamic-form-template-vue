<template>
  <form
    v-if="formsCreated.length > 0"
    class="mx-auto shadow-md px-10 py-6 border rounded w-full max-w-3xl grid gap-4 bg-white"
    @submit.prevent="submit"
  >
    <template v-for="form in modifiedForms" :key="form.field.id">
      <component
        :is="form.component"
        :field="form.field"
        v-model="form.value"
        @change="removeError(form)"
      />
    </template>

    <TheButton type="submit" variant="primary"> Submit Form </TheButton>
  </form>

  <section class="absolute inset-y-0 right-0 bg-white shadow-md rounded-s-lg">
    <div class="absolute inset-y-0 -left-10 grid items-center z-10">
      <TheButton size="sm" icon-only :icon="['fas', 'angles-right']" />
    </div>

    <div class="relative overflow-y-auto px-6 py-4 flex flex-col gap-3 max-h-full">
      <h2 class="text-2xl font-semibold">Build Form</h2>
      <div class="flex flex-col gap-2">
        <FormConfiguration
          v-for="(form, index) in formsCreated"
          :key="index"
          v-model:type="form.type"
          v-model:id="form.id"
          v-model:label="form.label"
          v-model:placeholder="form.placeholder"
          v-model:disabled="form.disabled"
          @duplicate="duplicateForm(index)"
          @delete="deleteForm(index)"
        />

        <TheButton size="sm" :icon="['fas', 'plus']" @click="addNewForm">Add Input</TheButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, shallowRef, watch } from 'vue'
import type { FormField, FormFieldModel } from '@/types/forms'

import TheInput from './TheInput.vue'
import TheTextarea from './TheTextarea.vue'
import TheSelect from './TheSelect.vue'
import TheRadioButton from './TheRadioButton.vue'
import TheSwitch from './TheSwitch.vue'
import TheCheckbox from './TheCheckbox.vue'
import TheButton from '../elements/TheButton.vue'

import FormConfiguration from '../composite/FormConfiguration.vue'

const decideComponent = (form: FormField) => {
  if (form.type === 'text') {
    return TheInput
  } else if (form.type === 'textarea') {
    return TheTextarea
  } else if (form.type === 'select') {
    return TheSelect
  } else if (form.type === 'radio') {
    return TheRadioButton
  } else if (form.type === 'switch') {
    return TheSwitch
  } else if (form.type === 'checkbox') {
    return TheCheckbox
  }
  return TheInput
}

class FormConfig {
  type: string
  id: string
  label: string
  placeholder: string
  disabled: boolean

  constructor() {
    this.type = ''
    this.id = ''
    this.label = ''
    this.placeholder = ''
    this.disabled = false
  }

  reset() {
    this.type = ''
    this.id = ''
    this.label = ''
    this.placeholder = ''
    this.disabled = false
  }

  clone(): FormConfig {
    const newConfig = new FormConfig()
    newConfig.type = this.type
    newConfig.id = this.id
    newConfig.label = this.label
    newConfig.placeholder = this.placeholder
    newConfig.disabled = this.disabled
    return newConfig
  }
}

// Logic building form
const formsCreated = reactive<FormConfig[]>([])

const addNewForm = () => {
  formsCreated.push(new FormConfig())
}

const duplicateForm = (index: number) => {
  const clonedForm = formsCreated[index].clone()
  formsCreated.push(clonedForm)
}

const deleteForm = (index: number) => {
  formsCreated.splice(index, 1)
}

const modifiedForms = shallowRef()
watch(
  formsCreated,
  (newForms) => {
    modifiedForms.value = newForms.map((form) => {
      return {
        field: form,
        component: decideComponent(form),
        // value: form.multiple || form.type == 'checkbox' ? [] : null,
        value: null,
      }
    })
  },
  { deep: true },
)

// Processing form submission
const emit = defineEmits(['submit'])

const removeError = (form: FormFieldModel) => {
  if (!modifiedForms.value) return

  modifiedForms.value = modifiedForms.value.map((f: any) => {
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

  if (modifiedForms.value.some((form: any) => !form.value)) {
    return (modifiedForms.value = modifiedForms.value.map((form: any) => {
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
    modifiedForms.value.reduce(
      (acc: any, form: any) => ({ ...acc, [form.field.id]: form.value }),
      {},
    ),
  )
}
</script>
