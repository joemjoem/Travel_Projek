<template>
  <section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Heading -->
      <h2 class="text-3xl font-bold text-center text-slate-800 mb-10">
        Testimoni Pelanggan
      </h2>

      <!-- Carousel Wrapper -->
      <div class="py-6 px-8 rounded-lg bg-gray-100">
        <div class="relative">
          <!-- Prev Button -->
          <UButton
            icon="i-lucide-chevron-left"
            color="neutral"
            variant="ghost"
            size="lg"
            class="absolute -left-5 top-1/2 -translate-y-1/2 z-10 shadow-md bg-white rounded-full"
            aria-label="Sebelumnya"
            @click="prev"
          />

          <!-- Cards -->
          <div class="overflow-hidden mx-6">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
              }"
            >
              <div
                v-for="(item, i) in testimonials"
                :key="i"
                class="flex-shrink-0 px-3"
                :style="{ width: `${100 / visibleCount}%` }"
              >
                <UCard
                  class="h-full"
                  :ui="{
                    root: 'bg-slate-50 ring-1 ring-slate-200 shadow-sm',
                    body: 'p-5'
                  }"
                >
                  <!-- Author -->
                  <div class="flex items-center gap-3 mb-4">
                    <div
                      class="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0"
                    >
                      <UIcon
                        name="i-lucide-user"
                        class="text-slate-500 w-5 h-5"
                      />
                    </div>
                    <span class="font-semibold text-slate-800 text-sm">{{
                      item.name
                    }}</span>
                  </div>

                  <!-- Quote -->
                  <p class="text-slate-500 text-sm leading-relaxed italic">
                    "{{ item.text }}"
                  </p>

                  <!-- Stars -->
                  <div class="flex gap-0.5 mt-4">
                    <UIcon
                      v-for="s in 5"
                      :key="s"
                      name="i-lucide-star"
                      class="w-4 h-4 text-emerald-500"
                    />
                  </div>
                </UCard>
              </div>
            </div>
          </div>

          <!-- Next Button -->
          <UButton
            icon="i-lucide-chevron-right"
            color="neutral"
            variant="ghost"
            size="lg"
            class="absolute -right-5 top-1/2 -translate-y-1/2 z-10 shadow-md bg-white rounded-full"
            aria-label="Berikutnya"
            @click="next"
          />
        </div>

        <!-- Dots -->
        <div class="flex justify-center gap-2 mt-8">
          <button
            v-for="(_, i) in testimonials"
            :key="i"
            class="h-2 rounded-full transition-all duration-200"
            :class="
              i === currentIndex ? 'bg-emerald-500 w-5' : 'bg-slate-300 w-2'
            "
            :aria-label="`Testimoni ${i + 1}`"
            @click="currentIndex = i"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: 'Rendy',
    text: 'Sudah beberapa kali pakai Siwakerta Travel untuk perjalanan dari Malang ke Bandara Juanda dan tidak pernah sekalipin mengecewakan.'
  },
  {
    name: 'Salam Rafi\'i',
    text: 'Sudah beberapa kali pakai Siwakerta Travel untuk perjalanan dari Malang ke Bandara Juanda dan tidak pernah sekalipin mengecewakan.'
  },
  {
    name: 'Susilo Adam\'s',
    text: 'Sudah beberapa kali pakai Siwakerta Travel untuk perjalanan dari Malang ke Bandara Juanda dan tidak pernah sekalipin mengecewakan.'
  },
  {
    name: 'Dewi Rahayu',
    text: 'Pelayanan sangat memuaskan, driver selalu on-time dan kendaraan bersih. Sangat direkomendasikan!'
  },
  {
    name: 'Budi Santoso',
    text: 'Harga terjangkau dan pelayanan prima. Sudah langganan sejak 2022 dan tidak pernah kecewa.'
  }
]

const currentIndex = ref(0)
const visibleCount = ref(3)

const updateVisibleCount = () => {
  if (window.innerWidth < 640) visibleCount.value = 1
  else if (window.innerWidth < 1024) visibleCount.value = 2
  else visibleCount.value = 3
}

const maxIndex = computed(() => testimonials.length - visibleCount.value)

const prev = () => {
  currentIndex.value = Math.max(0, currentIndex.value - 1)
}

const next = () => {
  currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1)
}

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleCount)
})
</script>
