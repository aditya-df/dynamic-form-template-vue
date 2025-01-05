<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none',
      {
        'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800':
          variant === 'primary',
        'opacity-50 cursor-not-allowed': disabled || loading,
        'w-full': block,
        'rounded-sm': rounded === 'sm',
        'rounded-md': rounded === 'md',
        'rounded-lg': rounded === 'lg',
        'rounded-full': rounded === 'full',
        'px-3 py-1.5 text-xs': size === 'sm',
        'px-5 py-2.5 text-sm': size === 'md',
        'px-6 py-3 text-base': size === 'lg',
      },
    ]"
  >
    <span v-if="icon && iconPosition === 'left'" :class="[{ 'mr-2': !iconOnly }, iconClass]">
      <font-awesome-icon :icon="icon" :style="{ color: iconColor }" :size="iconSize" />
    </span>
    <slot v-if="!iconOnly">Default</slot>
    <span v-if="icon && iconPosition === 'right'" :class="[{ 'ml-2': !iconOnly }, iconClass]">
      <font-awesome-icon :icon="icon" :style="{ color: iconColor }" :size="iconSize" />
    </span>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  iconPosition: {
    type: String,
    default: 'left',
  },
  iconSize: {
    type: String,
    default: 'sm',
  },
  iconColor: {
    type: String,
    default: 'currentColor',
  },
  iconClass: {
    type: String,
    default: '',
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  block: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: String,
    default: 'md',
  },
})
</script>
