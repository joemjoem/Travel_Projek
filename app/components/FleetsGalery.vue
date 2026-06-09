<template>
  <section
    id="armada"
    class="py-20 bg-slate-50 dark:bg-slate-950"
  >
    <div class="container mx-auto px-4 max-w-5xl">
      <div class="text-center mb-12">
        <h2
          class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-wide"
        >
          Armada Kami
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div
          v-for="car in fleets"
          :key="car.name"
          class="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col justify-between group"
        >
          <div
            class="p-6 md:p-8 flex items-center justify-center bg-white dark:bg-slate-900 min-h-[200px]"
          >
            <img
              :src="car.image"
              :alt="car.name"
              class="w-full max-w-[280px] h-auto object-contain transform group-hover:scale-105 transition duration-300"
            >
          </div>

          <div class="bg-[#0b1c3d] text-white text-center py-4 px-4">
            <h3 class="font-bold text-base md:text-lg tracking-wide">
              {{ car.name }}
            </h3>
            <p class="text-slate-400 text-xs mt-0.5 font-light">
              Kapasitas Mas: {{ car.capacity }} penumpang
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const fleets = [
  {
    name: 'New Avanza',
    capacity: 4,
    image:
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=400' // Gambar sementara
  },
  {
    name: 'Innova Reborn',
    capacity: 5,
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400' // Gambar sementara
  },
  {
    name: 'Hiace Commuter',
    capacity: 14,
    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400' // Gambar sementara
  },
  {
    name: 'Hiace Premio',
    capacity: 14,
    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400' // Gambar sementara
  }
]
</script>
