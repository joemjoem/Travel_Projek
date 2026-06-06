<template>
  <UCard
    class="max-w-4xl mx-auto shadow-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div
          class="p-2 bg-emerald-50 text-emerald-600 rounded-lg dark:bg-emerald-950/50 dark:text-emerald-400"
        >
          <UIcon name="i-heroicons-ticket" class="w-6 h-6" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">
            Form Pemesanan Tiket
          </h3>
          <p class="text-xs text-slate-500">
            Silakan lengkapi data perjalanan Anda
          </p>
        </div>
      </div>
    </template>

    <div
      class="grid grid-cols-3 gap-2 mb-6 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        @click="activeTab = tab.id"
        :class="[
          'py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-2',
          activeTab === tab.id
            ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300',
        ]"
      >
        <UIcon :name="tab.icon" class="w-4 h-4 md:w-5 md:h-5" />
        <span>{{ tab.name }}</span>
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormGroup label="Nama Lengkap" required>
          <UInput
            v-model="formData.name"
            placeholder="Masukkan nama sesuai KTP"
            icon="i-heroicons-user"
            size="md"
          />
        </UFormGroup>

        <UFormGroup label="Tanggal Perjalanan" required>
          <UInput
            v-model="formData.date"
            type="date"
            icon="i-heroicons-calendar"
            size="md"
          />
        </UFormGroup>
      </div>

      <hr class="border-slate-100 dark:border-slate-800my-2" />

      <div
        v-if="activeTab === 'reguler'"
        class="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in"
      >
        <UFormGroup label="Kota Asal" required>
          <UInput
            v-model="formData.origin"
            placeholder="Contoh: Surabaya"
            icon="i-heroicons-map-pin"
            size="md"
          />
        </UFormGroup>
        <UFormGroup label="Kota Tujuan" required>
          <UInput
            v-model="formData.destination"
            placeholder="Contoh: Jember"
            icon="i-heroicons-flag"
            size="md"
          />
        </UFormGroup>
        <UFormGroup label="Jumlah Penumpang" required>
          <UInput
            v-model.number="formData.passengers"
            type="number"
            min="1"
            icon="i-heroicons-users"
            size="md"
          />
        </UFormGroup>
      </div>

      <div
        v-if="activeTab === 'carter'"
        class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in"
      >
        <UFormGroup label="Pilihan Armada Mobil" required>
          <USelectMenu
            v-model="formData.vehicle"
            :options="[
              'Avanza / Xenia',
              'Innova Reborn / Zenix',
              'Hiace Commuter',
              'Hiace Premio',
            ]"
            placeholder="Pilih armada mobil"
            icon="i-heroicons-truck"
            size="md"
          />
        </UFormGroup>
        <UFormGroup label="Jumlah Penumpang" required>
          <UInput
            v-model.number="formData.passengers"
            type="number"
            min="1"
            icon="i-heroicons-users"
            size="md"
          />
        </UFormGroup>
      </div>

      <div
        v-if="activeTab === 'tour'"
        class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in"
      >
        <UFormGroup label="Pilihan Destinasi Wisata" required>
          <USelectMenu
            v-model="formData.tourPackage"
            :options="[
              'Paket Wisata Bromo Sunrise',
              'Paket Tour Kawah Ijen',
              'City Tour Malang-Batu 2D1N',
            ]"
            placeholder="Pilih paket tour"
            icon="i-heroicons-globe-asia-australia"
            size="md"
          />
        </UFormGroup>
        <UFormGroup label="Jumlah Peserta Tur" required>
          <UInput
            v-model.number="formData.passengers"
            type="number"
            min="1"
            icon="i-heroicons-users"
            size="md"
          />
        </UFormGroup>
      </div>

      <div class="pt-4 flex justify-end">
        <UButton
          type="submit"
          color="emerald"
          size="lg"
          icon="i-heroicons-chat-bubble-left-right"
          class="w-full md:w-auto font-bold shadow-lg shadow-emerald-500/20"
        >
          Kirim Pemesanan via WhatsApp
        </UButton>
      </div>
    </form>
  </UCard>
</template>

<script setup>
const { sendBooking } = useWhatsApp();

const activeTab = ref("reguler");

const tabs = [
  {
    id: "reguler",
    name: "Travel Reguler",
    icon: "i-heroicons-arrows-right-left",
  },
  { id: "carter", name: "Carter Drop", icon: "i-heroicons-truck" },
  { id: "tour", name: "Paket Tour", icon: "i-heroicons-globe-asia-australia" },
];

// State Form tunggal (Single Source of Truth)
const formData = ref({
  name: "",
  type: "reguler",
  date: "",
  passengers: 1,
  origin: "",
  destination: "",
  vehicle: undefined,
  tourPackage: undefined,
});

// Ketika tab berganti, otomatis sesuaikan tipe layanannya
watch(activeTab, (newTab) => {
  formData.value.type = newTab;
});

const handleSubmit = () => {
  // Validasi dasar
  if (!formData.value.name || !formData.value.date) {
    alert("Mohon lengkapi Nama dan Tanggal Perjalanan terlebih dahulu!");
    return;
  }

  // Eksekusi kirim data form lewat WhatsApp
  sendBooking(formData.value);
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
