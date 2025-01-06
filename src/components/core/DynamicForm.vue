<template>
  <form
    v-if="modifiedForms && modifiedForms.length > 0"
    class="mx-auto shadow-md px-10 py-6 border rounded w-full max-w-3xl grid gap-4 bg-slate-50"
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

  <SideMenu @update="updateForm" @export="exportCode" />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { FormConfig, type FormField, type FormFieldModel } from '@/types/forms'

import TheInput from '@/components/forms/TheInput.vue'
import TheTextarea from '@/components/forms/TheTextarea.vue'
import TheSelect from '@/components/forms/TheSelect.vue'
import TheRadioButton from '@/components/forms/TheRadioButton.vue'
import TheSwitch from '@/components/forms/TheSwitch.vue'
import TheCheckbox from '@/components/forms/TheCheckbox.vue'
import TheButton from '@/components/elements/TheButton.vue'
import SideMenu from '@/components/core/SideMenu.vue'

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

const modifiedForms = shallowRef()
const updateForm = (form: FormConfig[]) => {
  modifiedForms.value = form.map((form) => {
    return {
      field: form,
      component: decideComponent(form),
      // value: form.multiple || form.type == 'checkbox' ? [] : null,
      value: null,
    }
  })
}

// Processing form submission
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

  const objectPayload = modifiedForms.value.reduce(
    (acc: any, form: any) => ({ ...acc, [form.field.id]: form.value }),
    {},
  )
  console.log(objectPayload)
}

// Export code
const exportCode = () => {
  const variable = modifiedForms.value.reduce((acc: any, form: any) => {
    let fieldText = ''
    for (const [key, value] of Object.entries(form.field)) {
      if (key === 'disabled') {
        fieldText += `\n\t\t${key}: ${Boolean(value)},`
      } else {
        fieldText += `\n\t\t${key}: '${value}',`
      }
    }

    return (
      acc +
      `
    {
      field: {${fieldText}
      },
      component: ${form.component.__name},
      value: ${form.value},
    },`
    )
  }, '')

  const template = `<template>
  <form
    v-if="modifiedForms && modifiedForms.length > 0"
    class="mx-auto shadow-md px-10 py-6 border rounded w-full max-w-3xl grid gap-4 bg-slate-50"
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
  <\/template>`

  const script = `
  <script setup lang="ts">
  import { ref } from 'vue'

  import TheInput from '@/components/forms/TheInput.vue'
  import TheTextarea from '@/components/forms/TheTextarea.vue'
  import TheSelect from '@/components/forms/TheSelect.vue'
  import TheRadioButton from '@/components/forms/TheRadioButton.vue'
  import TheSwitch from '@/components/forms/TheSwitch.vue'
  import TheCheckbox from '@/components/forms/TheCheckbox.vue'
  import TheButton from '@/components/elements/TheButton.vue'
  import SideMenu from '@/components/core/SideMenu.vue'

  const modifiedForms = ref([${variable}
  ])

  // Processing form submission
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

  const objectPayload = modifiedForms.value.reduce(
    (acc: any, form: any) => ({ ...acc, [form.field.id]: form.value }),
    {},
  )
  console.log(objectPayload)
  }
  <\/script>`

  const code = `
  ${template}
  ${script}`
  console.log(code)
}
</script>
