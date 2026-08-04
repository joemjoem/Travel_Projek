<script setup>
import { useWhatsApp } from '@/composables/useWhatsApp'
import { z } from 'zod'

const props = defineProps({
  showCancel: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['closeModal'])
const { sendRegulerBookingForm } = useWhatsApp()

// ===== DATA KOTA =====
// "needsPicker: true" -> titik belum jelas, butuh LocationPicker (search alamat)
// "needsPicker: false" -> titik sudah jelas (bandara/pelabuhan), cukup dropdown
const cityOptions = [
  { value: 'malang', label: 'Malang', needsPicker: true },
  { value: 'blitar', label: 'Blitar', needsPicker: true },
  { value: 'surabaya-kota', label: 'Surabaya Kota', needsPicker: true },
  { value: 'surabaya-juanda', label: 'Surabaya - Juanda', needsPicker: false },
  {
    value: 'surabaya-tanjungperak',
    label: 'Surabaya - Tanjung Perak',
    needsPicker: false
  }
]

// Aturan: Malang/Blitar hanya bisa ke kelompok Surabaya, dan sebaliknya.
// Tidak ada Malang <-> Blitar langsung.
const groupOf = (cityValue) => {
  if (cityValue === 'malang' || cityValue === 'blitar') return 'malang-blitar'
  return 'surabaya'
}

// ===== STATE =====
const state = reactive({
  name: '',
  origin: '',
  destination: '',
  date: '',
  totalPessanger: 1,
  pickupLocation: null,
  dropoffLocation: null
})

// Opsi tujuan otomatis menyesuaikan grup dari kota asal yang dipilih
const destinationOptions = computed(() => {
  if (!state.origin) return []
  const originGroup = groupOf(state.origin)
  return cityOptions.filter(c => groupOf(c.value) !== originGroup)
})

// Reset tujuan kalau asal berubah dan tujuan lama sudah tidak valid (grup sama)
watch(
  () => state.origin,
  (newOrigin) => {
    if (!newOrigin) return
    const validDestinations = destinationOptions.value.map(d => d.value)
    if (!validDestinations.includes(state.destination)) {
      state.destination = ''
      state.dropoffLocation = null
    }
  }
)

// Apakah LocationPicker perlu ditampilkan untuk asal/tujuan
const originNeedsPicker = computed(
  () => cityOptions.find(c => c.value === state.origin)?.needsPicker ?? false
)
const destinationNeedsPicker = computed(
  () =>
    cityOptions.find(c => c.value === state.destination)?.needsPicker
    ?? false
)

// Reset titik picker kalau kota dipilih ulang
watch(
  () => state.origin,
  () => {
    state.pickupLocation = null
  }
)
watch(
  () => state.destination,
  () => {
    state.dropoffLocation = null
  }
)

// ===== SCHEMA =====
const schema = z
  .object({
    name: z.string().min(3, 'Nama tidak boleh kosong'),
    origin: z.string().min(1, 'Kota asal wajib dipilih'),
    destination: z.string().min(1, 'Kota tujuan wajib dipilih'),
    date: z.string().min(1, 'Tanggal perjalanan wajib diisi'),
    totalPessanger: z.number().min(1, 'Minimal 1 penumpang'),
    pickupLocation: z.any().nullable(),
    dropoffLocation: z.any().nullable()
  })
  .refine(
    (data) => {
      const origin = cityOptions.find(c => c.value === data.origin)
      if (origin?.needsPicker && !data.pickupLocation) return false
      return true
    },
    { message: 'Titik jemput wajib dipilih di peta', path: ['pickupLocation'] }
  )
  .refine(
    (data) => {
      const dest = cityOptions.find(c => c.value === data.destination)
      if (dest?.needsPicker && !data.dropoffLocation) return false
      return true
    },
    {
      message: 'Titik tujuan wajib dipilih di peta',
      path: ['dropoffLocation']
    }
  )

function closeModal() {
  emits('closeModal')
}

async function onSubmit(event) {
  const originLabel = cityOptions.find(
    c => c.value === event.data.origin
  )?.label
  const destLabel = cityOptions.find(
    c => c.value === event.data.destination
  )?.label

  sendRegulerBookingForm({
    // ...event.data,
    name: event.data.name,
    date: event.data.date,
    totalPessanger: event.data.totalPessanger,
    originLabel,
    destLabel,
    pickupLocation: state.pickupLocation,
    dropoffLocation: state.dropoffLocation
  })
}

const customInputUi = {
  base: 'focus:!border-[#0b1c3d] focus:!ring-[#0b1c3d] dark:!focus:border-[#0b1c3d] dark:focus:!ring-[#0b1c3d]'
}
</script>

<template>
  <div class="w-full mx-auto p-2 sm:p-4">
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-5"
      @submit="onSubmit"
    >
      <div class="w-full h-96 md:h-fit overflow-auto p-4 space-y-4">
        <!-- Nama -->
        <UFormField
          label="Nama Lengkap"
          name="name"
        >
          <UInput
            v-model="state.name"
            :ui="customInputUi"
            class="w-full"
            placeholder="Masukkan nama"
          />
        </UFormField>

        <!-- Kota Asal -->
        <UFormField
          label="Kota Asal"
          name="origin"
        >
          <USelect
            v-model="state.origin"
            :items="cityOptions"
            value-key="value"
            label-key="label"
            placeholder="Pilih kota asal..."
            :ui="customInputUi"
            class="w-full"
          />
        </UFormField>
        <!-- LocationPicker untuk titik jemput (muncul kalau kota asal "kasar") -->
        <Transition name="fade">
          <UFormField
            v-if="originNeedsPicker"
            label="Titik Jemput"
            name="pickupLocation"
          >
            <LocationPicker
              v-model="state.pickupLocation"
              placeholder="Cari alamat titik jemput..."
            />
          </UFormField>
        </Transition>
        <UFormField
          label="Kota Tujuan"
          name="destination"
        >
          <USelect
            v-model="state.destination"
            :items="destinationOptions"
            value-key="value"
            label-key="label"
            :disabled="!state.origin"
            :placeholder="
              state.origin
                ? 'Pilih kota tujuan...'
                : 'Pilih kota asal terlebih dahulu'
            "
            :ui="customInputUi"
            class="w-full"
          />
        </UFormField>

        <!-- LocationPicker untuk titik tujuan (muncul kalau kota tujuan "kasar") -->
        <Transition name="fade">
          <UFormField
            v-if="destinationNeedsPicker"
            label="Titik Tujuan"
            name="dropoffLocation"
          >
            <LocationPicker
              v-model="state.dropoffLocation"
              placeholder="Cari alamat titik tujuan..."
            />
          </UFormField>
        </Transition>

        <!-- Tanggal & Jumlah Penumpang -->
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div class="sm:col-span-7">
            <UFormField
              label="Tanggal Perjalanan"
              name="date"
            >
              <UInput
                v-model="state.date"
                type="date"
                :ui="customInputUi"
                class="w-full"
                @keydown.prevent
                @click="(e) => e.target.showPicker?.()"
              />
            </UFormField>
          </div>
          <div class="sm:col-span-5">
            <UFormField
              label="Jumlah Penumpang"
              name="totalPessanger"
            >
              <UInput
                v-model.number="state.totalPessanger"
                type="number"
                min="1"
                :ui="customInputUi"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div
          class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2"
        >
          <UButton
            v-if="props?.showCancel"
            variant="ghost"
            color="neutral"
            class="justify-center"
            @click="closeModal"
          >
            Batal
          </UButton>
          <UButton
            type="submit"
            color="primary"
            class="justify-center"
          >
            Pesan Sekarang
          </UButton>
        </div>
      </div>
    </UForm>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
