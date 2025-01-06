<template>
  <section
    class="absolute inset-y-0 right-0 bg-slate-50 shadow-md rounded-s-lg w-full transition-all"
    :class="isSideMenuShown ? 'max-w-xs px-6' : 'max-w-0'"
  >
    <div
      class="absolute inset-y-0 left-0 grid items-center z-10 transform"
      :class="isSideMenuShown ? '-translate-x-1/2' : '-translate-x-full'"
    >
      <div class="absolute inset-0" v-if="!isSideMenuShown">
        <div class="w-1/2 bg-slate-50 h-full translate-x-full shadow-md rounded-s-lg -z-10"></div>
      </div>
      <TheButton
        size="sm"
        icon-only
        :icon="['fas', 'angles-right']"
        @click="toggleSideMenu"
        class="z-10"
        :icon-class="
          !isSideMenuShown ? 'block rotate-180 transition-transform' : 'block transition-transform'
        "
      />
    </div>

    <div class="relative overflow-y-auto pb-4 flex flex-col gap-3 max-h-full h-full">
      <div class="bg-slate-50 pb-2 border-b sticky top-0 pt-4 flex gap-x-2 items-center">
        <h2 class="text-2xl font-black text-dark">Design Forms</h2>
        <div class="relative">
          <TheButton
            size="sm"
            icon-only
            :icon="['fas', 'caret-down']"
            @click="isDropdownShown = !isDropdownShown"
          />
          <div
            class="absolute right-0 top-full bg-white shadow-md border rounded-sm grid gap-y-2 w-36 transition-all px-2"
            :class="
              isDropdownShown
                ? 'py-2 max-h-screen visible opacity-100'
                : 'max-h-0 p-0 invisible opacity-0'
            "
          >
            <TheButton size="sm" :icon="['fas', 'download']" class="text-left"
              >Export code</TheButton
            >
            <TheButton size="sm" :icon="['fas', 'floppy-disk']" class="text-left" disabled
              >Save form</TheButton
            >
            <TheButton size="sm" :icon="['far', 'folder-open']" class="text-left" disabled
              >Load form</TheButton
            >
          </div>
        </div>
      </div>
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
import { ref, reactive, watch } from 'vue'
import { FormConfig } from '@/types'

import FormConfiguration from '../composite/FormConfiguration.vue'
import TheButton from '../elements/TheButton.vue'

const emit = defineEmits(['update'])

const isDropdownShown = ref(false)
const isSideMenuShown = ref(false)

const toggleSideMenu = () => {
  isSideMenuShown.value = !isSideMenuShown.value
  isDropdownShown.value = false
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

watch(
  formsCreated,
  (newForms) => {
    emit('update', newForms)
  },
  { deep: true },
)
</script>
