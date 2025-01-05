<template>
  <div class="flex flex-col gap-2 group">
    <label
      v-if="field.label"
      :for="field.id"
      class="order-first block text-gray-700 font-medium peer-disabled:text-gray-400"
      >{{ field.label }}</label
    >

    <div :class="['flex gap-2', field.direction === 'horizontal' ? 'flex-wrap' : 'flex-col']">
      <div v-for="option in field.options" :key="option.value" class="flex items-center gap-2">
        <input
          type="checkbox"
          :id="`${field.id}-${option.value}`"
          :name="field.id"
          :value="option.value"
          v-model="value"
          :disabled="field.disabled || option.disabled"
          @change="$emit('change')"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label :for="`${field.id}-${option.value}`" class="text-gray-700">
          {{ option.label }}
        </label>
      </div>
    </div>
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

defineEmits(['change', 'update:modelValue'])

const value = defineModel<Array<any>>()
</script>

<style lang="css" scoped>
/* .input-filled:not(:placeholder-shown) { */
/* @apply border-green-500; */
/* } */
</style>
