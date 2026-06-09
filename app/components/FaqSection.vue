<template>
  <section class="py-16 bg-white">
    <div class="max-w-3xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center text-slate-800 mb-10">
        FAQ SIWAKERTA Travel
      </h2>

      <UAccordion
        :items="faqs"
        :ui="{
          wrapper: 'flex flex-col gap-3 w-full',
          item: {
            base: 'w-full rounded-lg overflow-hidden border border-slate-200',
            padding: 'p-0',
            color: 'text-slate-600',
            size: 'text-sm'
          },
          default: {
            activeClass: 'text-emerald-400',
            inactiveClass: 'text-slate-300'
          },
          trigger:
            'w-full flex items-center justify-between px-5 py-4 bg-slate-800 text-white font-semibold text-sm text-left hover:bg-slate-700 transition-colors duration-200',
          content: 'px-5 py-4 text-slate-600 text-sm leading-relaxed bg-white',
          arrow: 'text-current w-5 h-5 flex-shrink-0'
        }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const faqs = [
  {
    label: 'Dapat Fasilitas apa saja diperjalanan?',
    content:
      'Kakak bakal dapat unit Innova Reborn yang bersih dan wangi, Full AC, Snack Box gratis (roti/kue), dan Air Mineral 330ml di tiap kursi.'
  },
  {
    label: 'Apakah boleh bawa banyak koper?',
    content:
      'Untuk armada Avanza dan Innova Reborn, kami menerima maksimal 2 koper ukuran sedang per penumpang. Untuk Hiace, kapasitas bagasi lebih besar dan fleksibel.'
  },
  {
    label: 'Apakah bisa antar ke terminal 1 atau terminal 2 Juanda?',
    content:
      'Ya, kami bisa mengantar ke Terminal 1 maupun Terminal 2 Juanda sesuai maskapai penerbangan Anda. Harap informasikan terminal tujuan saat pemesanan.'
  },
  {
    label: 'Apakah bisa jemput langsung ke rumah?',
    content:
      'Tentu! Layanan door-to-door adalah salah satu keunggulan kami. Driver akan datang langsung ke alamat penjemputan yang Anda tentukan.'
  }
]
</script>
