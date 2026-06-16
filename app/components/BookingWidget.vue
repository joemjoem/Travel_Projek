<script setup>
const emits = defineEmits(['closeModal'])
const activeTab = ref('reguler')

const tabs = [
  {
    id: 'reguler',
    name: 'Travel Reguler',
    icon: 'i-heroicons-arrows-right-left'
  },
  { id: 'carter', name: 'Carter Drop', icon: 'i-heroicons-truck' },
  { id: 'tour', name: 'Paket Tour', icon: 'i-heroicons-globe-asia-australia' }
]

const tourOptions = [
  {
    value: 'wisata-batu',
    label: 'Wisata Kota Batu',
    desc: '08:00–20:00 · Driver, Mobil, BBM'
  },
  {
    value: 'bromo',
    label: 'Wisata Gunung Bromo',
    desc: 'Sunrise/Sunset · Jeep, Mobil, Driver, BBM'
  },
  {
    value: 'batu-bromo',
    label: 'Batu - Bromo (2D1N)',
    desc: 'Jeep, Mobil, Driver, BBM'
  }
]

const selectedTourType = ref('wisata-batu')

// Reset tour type ke default saat pindah ke tab lain lalu balik
watch(activeTab, (newTab) => {
  if (newTab === 'tour') {
    selectedTourType.value = 'wisata-batu'
  }
})

// --------- handle close modal ---------
function closeModal() {
  emits('closeModal')
}
</script>

<template>
  <div
    class="max-w-4xl p-3 shadow-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden"
  >
    <!-- Tab Selector -->
    <div
      class="grid grid-cols-3 gap-2 mb-6 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        :class="[
          'py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-2',
          activeTab === tab.id
            ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
        ]"
        @click="activeTab = tab.id"
      >
        <UIcon
          :name="tab.icon"
          class="w-4 h-4 md:w-5 md:h-5"
        />
        <span>{{ tab.name }}</span>
      </button>
    </div>

    <!-- Form Content -->
    <div class="w-full">
      <!-- REGULER -->
      <RegulerPacketForm
        v-show="activeTab === 'reguler'"
        :show-cancel="false"
        class="w-full"
        @close-modal="closeModal"
      />

      <!-- CARTER DROP -->
      <CarterDropPackageForm
        v-show="activeTab === 'carter'"
        :show-cancel="false"
        class="w-full"
        @close-modal="closeModal"
      />

      <!-- PAKET TOUR -->
      <div v-show="activeTab === 'tour'">
        <!-- Radio pilih tipe wisata -->
        <div class="px-4 mb-4">
          <p
            class="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3"
          >
            Pilih Paket Wisata
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              v-for="opt in tourOptions"
              :key="opt.value"
              type="button"
              class="text-left px-3 py-2.5 rounded-lg border transition-all duration-150"
              :class="
                selectedTourType === opt.value
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              "
              @click="selectedTourType = opt.value"
            >
              <div class="flex items-start gap-2">
                <div
                  class="mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                  :class="
                    selectedTourType === opt.value
                      ? 'border-emerald-500'
                      : 'border-slate-300'
                  "
                >
                  <div
                    v-if="selectedTourType === opt.value"
                    class="w-2 h-2 rounded-full bg-emerald-500"
                  />
                </div>
                <div>
                  <p
                    class="text-xs font-semibold text-slate-800 dark:text-white"
                  >
                    {{ opt.label }}
                  </p>
                  <p class="text-xs text-slate-400 mt-0.5">
                    {{ opt.desc }}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Form wisata dengan tipe yang dipilih -->
        <HolidayPackageForm
          :holiday-type="selectedTourType"
          :show-cancel="false"
          @close-modal="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
} */
</style>
