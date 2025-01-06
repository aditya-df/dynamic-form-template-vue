<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'text-white font-medium rounded-lg text-sm focus:outline-none',
      {
        'bg-forest hover:bg-forest-shade focus:ring-4 focus:ring-forest-tint/50 dark:bg-forest-tint dark:hover:bg-forest dark:focus:ring-forest-shade':
          variant === 'primary',
        'bg-coral hover:bg-coral-shade focus:ring-4 focus:ring-coral-tint/50 dark:bg-coral-tint dark:hover:bg-coral dark:focus:ring-coral-shade':
          variant === 'accent',
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
