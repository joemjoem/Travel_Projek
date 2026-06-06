<template>
  <section class="bg-[#0b1c3d] text-white py-20">
    <div class="container mx-auto px-4 max-w-5xl">
      <div class="text-center mb-16">
        <h2 class="text-2xl md:text-3xl font-bold tracking-wide">
          Kenapa harus Kami
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex items-start gap-4"
        >
          <div
            class="bg-white text-[#0b1c3d] p-3 rounded-xl flex items-center justify-center shadow-md shrink-0 w-12 h-12"
          >
            <UIcon :name="feature.icon" class="w-6 h-6" />
          </div>

          <div class="space-y-1">
            <h3 class="font-bold text-base md:text-lg tracking-wide text-white">
              {{ feature.title }}
            </h3>
            <p
              class="text-slate-400 text-xs md:text-sm leading-relaxed font-light"
            >
              {{ feature.description }}
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
    icon: "i-lucide-car",
    title: "Armada Terawat",
    description:
      "Kami menyediakan armada kendaraan yang selalu dalam kondisi prima, dengan model terbaru untuk kenyamanan perjalanan Anda.",
  },
  {
    icon: "i-lucide-id-card",
    title: "Driver Berpengalaman",
    description:
      "Driver kami terlatih, berpengalaman, dan mengutamakan keselamatan serta kenyamanan Anda selama perjalanan.",
  },
  {
    icon: "i-lucide-tag",
    title: "Harga Kompetitif dan Transparan",
    description:
      "Kami menawarkan harga yang bersaing dengan rincian biaya yang jelas, tanpa ada biaya tersembunyi.",
  },
  {
    icon: "i-lucide-text-select", // Representasi ikon list/menu pemesanan
    title: "Pemesanan Mudah dan Cepat",
    description:
      "Dengan sistem pemesanan online yang user-friendly, Anda dapat memesan layanan transportasi kami dalam hitungan menit.",
  },
];
</script>
