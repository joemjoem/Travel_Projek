<template>
  <section
    id="home"
    class="bg-[#0b1c3d] text-white pt-16 pb-24 md:pb-32 relative overflow-visible"
  >
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-6 text-left z-10">
          <h1
            class="text-3xl md:text-5xl font-bold leading-tight tracking-wide"
          >
            Hadirkan kenyamanan dan keamanan dalam setiap perjalanan antarkota
            Anda.
          </h1>
          <p
            class="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed"
          >
            Nikmati kemudahan reservasi kapan saja dengan layanan operasional
            yang tersedia selama 24 jam.
          </p>

          <div class="pt-2 flex flex-wrap items-center gap-6">
            <button
              type="button"
              class="px-6 py-3 bg-white text-[#0b1c3d] font-bold rounded-md hover:bg-slate-100 transition shadow-lg text-sm md:text-base"
              @click="$emit('open-booking')"
            >
              Booking Sekarang
            </button>

            <a
              href="#layanan"
              class="flex items-center gap-2 font-bold text-white hover:text-slate-300 transition text-sm md:text-base"
            >
              Lihat Layanan
              <UIcon
                name="i-heroicons-arrow-long-right"
                class="w-5 h-5"
              />
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 relative z-20 mt-8 lg:mt-12 lg:-mb-44">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800"
            alt="Armada Siwakerta Travel"
            class="w-full h-auto object-cover rounded-xl shadow-2xl lg:scale-110 transform origin-bottom-left"
          >
        </div>
      </div>
    </div>

    <div
      class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 max-w-2xl bg-white text-slate-800 py-3 px-6 rounded-xl shadow-xl z-30 border border-slate-100 hidden md:block"
    >
      <div
        class="flex items-center justify-center gap-8 text-xs md:text-sm font-medium"
      >
        <span class="text-slate-400 font-bold tracking-wider uppercase text-2xs">Sosial Media Kami:</span>

        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-instagram"
            class="w-5 h-5 text-[#0b1c3d]"
          />
          <span class="text-slate-700">SIWAKERTA_TRAVEL</span>
        </div>

        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-phone"
            class="w-5 h-5 text-[#0b1c3d]"
          />
          <span class="text-slate-700">0899-9890-9999</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['open-booking'])
</script>
