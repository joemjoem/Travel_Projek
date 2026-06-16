<script setup lang="ts">
const props = defineProps<{
  holidayType: string
}>()

const emits = defineEmits(['closeModal'])
function closeModal() {
  emits('closeModal')
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto p-2 sm:p-4">
    <div class="flex items-center justify-between gap-3 p-4">
      <div class="flex items-center gap-2">
        <div
          class="flex items-center justify-center p-2 bg-emerald-50 text-emerald-600 rounded-lg dark:bg-emerald-950/50 dark:text-emerald-400"
        >
          <UIcon
            name="i-heroicons-ticket"
            class="w-6 h-6"
          />
        </div>
        <div>
          <h3
            class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white"
          >
            Form Booking Carter Drop
          </h3>
          <p class="text-xs text-slate-500">
            Silakan lengkapi data perjalanan Anda
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
    <HolidayPackageForm
      :holiday-type="props?.holidayType"
      @close-modal="closeModal"
    />
  </div>
</template>
