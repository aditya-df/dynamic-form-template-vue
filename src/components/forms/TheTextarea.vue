<template>
  <div class="flex flex-col gap-2 group">
    <textarea
      :id="field.id"
      :name="field.id"
      :disabled="field.disabled"
      :placeholder="field.placeholder"
      :autofocus="field.autofocus"
      v-model="value"
      @input="$emit('change')"
      :class="
        [
          'order-3 border rounded-md px-4 py-2 transition-colors border-gray-300 hover:border-gray-500 focus:ring focus:ring-blue-200 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed placeholder-gray-400 focus:placeholder-gray-700 input-filled peer group-focus-within:border-blue-500',
          field.error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
        ].join(' ')
      "
      :maxlength="field.maxLength"
      :rows="field.rows"
    />
    <label
      v-if="field.label"
      :for="field.id"
      class="order-first block text-gray-700 font-medium peer-disabled:text-gray-400"
      >{{ field.label }}</label
    >
  </div>
</template>

<script setup lang="ts">
import type { FormField } from '@/types/forms'

withDefaults(
  defineProps<{
    field: FormField
  }>(),
  {
    field: () => ({}) as FormField,
  },
)

defineEmits(['change'])

const value = defineModel<string>()
</script>

<style lang="css" scoped>
/* .input-filled:not(:placeholder-shown) { */
/* @apply border-green-500; */
/* } */
</style>
