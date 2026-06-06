<!-- app/components/Testimonials.vue -->
<template>
  <section class="py-20 bg-white dark:bg-slate-950">
    <div class="container mx-auto px-4 max-w-5xl">
      <!-- Judul Section -->
      <div class="text-center mb-12">
        <h2
          class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-wide"
        >
          Testimoni Pelanggan
        </h2>
      </div>

      <!-- Kontainer Abu-abu Pembungkus (Sesuai Desain Figma) -->
      <div
        class="bg-slate-100 dark:bg-slate-900 rounded-2xl p-6 md:p-10 relative"
      >
        <!-- 
          SISTEM LAYOUT:
          - Di Mobile/HP: Otomatis bisa di-scroll ke samping (flex flex-row overflow-x-auto)
          - Di Desktop: Otomatis mengunci jadi 3 kolom sejajar pas (md:grid md:grid-cols-3)
        -->
        <div
          class="flex flex-row overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory"
        >
          <div
            v-for="review in testimonials"
            :key="review.name"
            class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-100 dark:border-slate-700 text-left flex flex-col justify-between min-h-[180px] min-w-[280px] md:min-w-0 w-full snap-center shrink-0"
          >
            <!-- Identitas Pelanggan (Avatar & Nama) -->
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-[#0b1c3d] dark:text-slate-300"
              >
                <UIcon name="i-lucide-user" class="w-6 h-6" />
              </div>
              <h3
                class="font-bold text-sm md:text-base text-slate-900 dark:text-white"
              >
                {{ review.name }}
              </h3>
            </div>

            <!-- Isi Teks Review -->
            <p
              class="text-slate-600 dark:text-slate-300 text-xs md:text-sm italic leading-relaxed"
            >
              "{{ review.text }}"
            </p>
          </div>
        </div>

        <!-- Tombol Navigasi Visual Dekoratif (Sesuai Desain Figma untuk Desktop) -->
        <div class="hidden md:block">
          <!-- Tombol Kiri -->
          <button
            class="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-[#0b1c3d] text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-[#162a54] transition"
          >
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" />
          </button>
          <!-- Tombol Kanan -->
          <button
            class="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-[#0b1c3d] text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-[#162a54] transition"
          >
            <UIcon name="i-lucide-chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: "Rendy",
    text: "Sudah beberapa kali pakai Makuta Travel untuk perjalanan dari Malang ke Bandara Juanda dan tidak pernah sekalipun mengecewakan.",
  },
  {
    name: "Salam Rafi'i",
    text: "Sudah beberapa kali pakai Makuta Travel untuk perjalanan dari Malang ke Bandara Juanda dan tidak pernah sekalipun mengecewakan.",
  },
  {
    name: "Susilo Adam's",
    text: "Sudah beberapa kali pakai Makuta Travel untuk perjalanan dari Malang ke Bandara Juanda dan tidak pernah sekalipun mengecewakan.",
  },
];
</script>

<style scoped>
/* Menghilangkan scrollbar default browser agar perpindahan swipe di HP terlihat mulus */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
