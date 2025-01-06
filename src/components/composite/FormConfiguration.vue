<template>
  <div class="grid gap-y-1 border p-4 bg-white">
    <div class="flex justify-end gap-2 mb-2">
      <TheButton size="sm" :icon="['fas', 'copy']" @click="$emit('duplicate')" icon-only />
      <TheButton size="sm" :icon="['fas', 'trash']" @click="$emit('delete')" icon-only />
    </div>
    <TheSelect
      :field="{
        id: 'typeInputOne',
        label: 'Select Type',
        placeholder: 'Select Type',
        options: [
          {
            label: 'Text',
            value: 'text',
          },
          {
            label: 'Email',
            value: 'email',
          },
          {
            label: 'Password',
            value: 'password',
          },
          {
            label: 'Number',
            value: 'number',
          },
          {
            label: 'Select',
            value: 'select',
          },
          {
            label: 'Checkbox',
            value: 'checkbox',
          },
          {
            label: 'Radio',
            value: 'radio',
          },
          {
            label: 'Textarea',
            value: 'textarea',
          },
          {
            label: 'Switch',
            value: 'switch',
          },
          {
            label: 'Range',
            value: 'range',
          },
          {
            label: 'Color',
            value: 'color',
          },
        ],
      }"
      v-model="config.type"
    />
    <TheInput :field="{ id: 'idInputOne', label: 'Id Input' }" v-model="config.id" />
    <TheInput :field="{ id: 'labelInputOne', label: 'Label Input' }" v-model="config.label" />
    <TheInput
      :field="{ id: 'placeholderInputOne', label: 'Placeholder Input' }"
      v-model="config.placeholder"
    />
    <TheSwitch
      :field="{
        id: 'disabledInputOne',
        label: 'Disabled',
        direction: 'vertical',
      }"
      v-model="config.disabled"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import TheInput from '@/components/forms/TheInput.vue'
import TheSelect from '@/components/forms/TheSelect.vue'
import TheSwitch from '@/components/forms/TheSwitch.vue'
import TheButton from '../elements/TheButton.vue'

const props = defineProps<{
  type: string
  id: string
  label: string
  placeholder: string
  disabled: boolean
}>()

const emit = defineEmits([
  'update:type',
  'update:id',
  'update:label',
  'update:placeholder',
  'update:disabled',
  'delete',
  'duplicate',
])

const config = reactive({
  type: props.type,
  id: props.id,
  label: props.label,
  placeholder: props.placeholder,
  disabled: props.disabled,
})

watch(
  () => config.type,
  (val) => emit('update:type', val),
)
watch(
  () => config.id,
  (val) => emit('update:id', val),
)
watch(
  () => config.label,
  (val) => emit('update:label', val),
)
watch(
  () => config.placeholder,
  (val) => emit('update:placeholder', val),
)
watch(
  () => config.disabled,
  (val) => emit('update:disabled', val),
)
</script>
