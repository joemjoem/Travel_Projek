<template>
  <section
    id="layanan"
    class="py-20 bg-white dark:bg-slate-900"
  >
    <div class="container mx-auto px-4">
      <div class="text-center max-w-xl mx-auto mb-16">
        <h2
          class="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2"
        >
          SIWAKERTA TRAVEL
        </h2>
        <p
          class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
        >
          Layanan Terbaik Kami
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div
          v-for="(item, idx) in features"
          :key="idx"
          class="flex gap-4 p-4 border border-slate-100 rounded-xl dark:border-slate-800"
        >
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-slate-900 text-white rounded flex items-center justify-center"
            >
              <UIcon
                name="i-heroicons-check"
                class="w-5 h-5"
              />
            </div>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-1">
              {{ item.title }}
            </h4>
            <p
              class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
            >
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    title: 'Travel Reguler',
    desc: 'Layanan antar jemput penumpang rute tetap antar kota secara aman, terjadwal, dan nyaman.'
  },
  {
    title: 'Carter Drop',
    desc: 'Sewa mobil pribadi sekaligus driver untuk kebutuhan drop off satu kali jalan luar/dalam kota.'
  },
  {
    title: 'Kirim Paket',
    desc: 'Pengiriman paket kilat semalam sampai menggunakan jaringan armada travel operasional kami.'
  },
  {
    title: 'Wisata / Tour',
    desc: 'Paket perjalanan wisata keliling destinasi populer dengan fasilitas lengkap tanpa ribet.'
  }
]
</script>
