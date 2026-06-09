<template>
  <section class="bg-[#0b1c3d] text-white py-20 relative overflow-hidden">
    <div class="container mx-auto px-4 max-w-6xl relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-2xl md:text-3xl font-bold tracking-wide">
          Cara Booking di Siwakerta Travel
        </h2>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-x-6 lg:gap-x-8 pt-6"
      >
        <div
          v-for="step in bookingSteps"
          :key="step.number"
          class="bg-white text-slate-800 rounded-xl px-6 pb-8 pt-10 text-center relative shadow-xl flex flex-col items-center justify-start min-h-[220px]"
        >
          <div
            class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-2 border-[#0b1c3d] rounded-full flex items-center justify-center font-bold text-lg text-[#0b1c3d] shadow-md"
          >
            {{ step.number }}
          </div>

          <div class="text-[#0b1c3d] mb-3 flex items-center justify-center">
            <UIcon
              :name="step.icon"
              class="w-8 h-8"
            />
          </div>

          <h3 class="font-bold text-base md:text-lg text-slate-900 mb-2">
            {{ step.title }}
          </h3>

          <p class="text-slate-600 text-xs md:text-sm leading-relaxed max-w-xs">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const bookingSteps = [
  {
    number: 1,
    icon: 'i-lucide-message-square', // Alternatif ikon chat WhatsApp
    title: 'Chat WhatsApp',
    description:
      'Kirim nama, alamat jemput lengkap, jumlah penumpang, dan jadwal ke admin kami.'
  },
  {
    number: 2,
    icon: 'i-lucide-check-square', // Ikon checklist konfirmasi
    title: 'Konfirmasi Booking',
    description:
      'Admin konfirmasi ketersediaan armada dan detail perjalanan Anda segera.'
  },
  {
    number: 3,
    icon: 'i-lucide-car', // Ikon mobil siap berangkat
    title: 'Siap Berangkat',
    description:
      'Driver datang tepat waktu ke alamat Anda. Bayar saat naik atau via transfer.'
  }
]
</script>
