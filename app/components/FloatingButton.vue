<script setup lang="ts">
import { useWhatsApp } from '@/composables/useWhatsApp'

const { sendMessageToAdmin } = useWhatsApp()
</script>

<template>
  <div
    class="fixed bottom-2 right-2 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2"
  >
    <!-- Label "Ada pertanyaan?" -->
    <div
      class="hidden md:block bg-white text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg shadow-md border border-slate-100 animate-bounce"
    >
      Ada pertanyaan?
    </div>

    <!-- Floating Button -->
    <div
      class="hidden hover:cursor-pointer w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg md:flex items-center justify-center transition-colors duration-200"
      @click="sendMessageToAdmin"
    >
      <UIcon
        name="i-simple-icons-whatsapp"
        class="w-7 h-7 text-white"
      />
    </div>
    <div
      class="md:hidden hover:cursor-pointer text-xs text-white p-1 bg-emerald-500 rounded shadow-lg flex items-center justify-center transition-colors duration-200"
      @click="sendMessageToAdmin"
    >
      Ada pertanyaan? tekan disini
    </div>
  </div>
</template>
