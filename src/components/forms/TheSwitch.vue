<template>
  <div class="flex gap-2 group" :class="{ 'flex-col items-start': field.direction == 'vertical' }">
    <label
      class="relative inline-flex items-center"
      :class="[
        field.direction == 'vertical' ? 'order-last' : '',
        field.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ]"
    >
      <input
        v-bind="field"
        type="checkbox"
        v-model="value"
        @input="$emit('change')"
        class="sr-only peer"
        ref="switch"
      />
      <div
        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"
      ></div>
    </label>
    <span
      v-if="field.label"
      @click="$refs.switch.click()"
      class="text-gray-700 font-medium peer-disabled:text-gray-400 select-none"
      >{{ field.label }}</span
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

const value = defineModel()
</script>

<style lang="css" scoped>
/* .input-filled:not(:placeholder-shown) { */
/* @apply border-green-500; */
/* } */
</style>
