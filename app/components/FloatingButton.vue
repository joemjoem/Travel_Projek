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
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      class="hidden w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg md:flex items-center justify-center transition-colors duration-200"
    >
      <UIcon
        name="i-simple-icons-whatsapp"
        class="w-7 h-7 text-white"
      />
    </a>
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      class="md:hidden text-xs text-white p-1 bg-emerald-500 rounded shadow-lg flex items-center justify-center transition-colors duration-200"
    >
      Ada pertanyaan? tekan disini
    </a>
  </div>
</template>

<script setup lang="ts">
// Ganti nomor & pesan default sesuai kebutuhan
const phoneNumber = '6281234567890'
const defaultMessage
  = 'Halo, saya ada pertanyaan terkait layanan travel Siwakerta.'

const whatsappUrl = computed(
  () =>
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`
)
</script>
