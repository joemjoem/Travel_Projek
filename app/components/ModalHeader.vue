<script setup lang="ts">
const props = defineProps<{
  title?: string
  subTitle?: string
  icon?: string
}>()

const emits = defineEmits(['closeModal'])

function closeModal() {
  emits('closeModal')
}
</script>

<template>
  <div class="w-full flex items-center justify-between gap-3 p-3">
    <div class="flex items-center gap-2">
      <div
        class="flex items-center justify-center p-2 bg-emerald-50 text-emerald-600 rounded-lg dark:bg-emerald-950/50 dark:text-emerald-400"
      >
        <UIcon
          :name="props?.icon"
          class="w-6 h-6"
        />
      </div>
      <div>
        <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          {{ props?.title }}
        </h3>
        <p class="text-xs text-slate-500">
          {{ props?.subTitle }}
        </p>
      </div>
    </div>
    <div
      class="p-1 hover:bg-slate-100/30 flex items-center justify-center rounded hover:cursor-pointer"
      @click="closeModal"
    >
      <UIcon
        name="i-lucide-x"
        class="w-6 h-6"
      />
    </div>
  </div>
</template>
