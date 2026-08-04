<script setup>
import { useWhatsApp } from '@/composables/useWhatsApp'
import { z } from 'zod'

const { emitFormChange } = useFormField()

const emits = defineEmits(['closeModal'])
const { sendCarterBookingForm } = useWhatsApp()

// ===== DATA KOTA & HARGA CARTER =====
const carterData = {
  'malang': {
    label: 'Malang Kota',
    needsPicker: true,
    units: {
      calya: {
        label: 'Calya / Avanza',
        routes: [
          {
            label: 'Malang Kota → Surabaya Juanda',
            price: 550000,
            value: 'Malang Kota → Surabaya Juanda'
          },
          {
            label: 'Malang Kota → Surabaya Kota',
            price: 650000,
            value: 'Malang Kota → Surabaya Kota'
          },
          {
            label: 'Malang Kota → Surabaya Tanjung Perak',
            price: 650000,
            value: 'Malang Kota → Surabaya Tanjung Perak'
          }
        ]
      },
      innova: {
        label: 'Innova Reborn',
        routes: [
          {
            label: 'Malang Kota → Surabaya Juanda',
            price: 700000,
            value: 'Malang Kota → Surabaya Juanda'
          },
          {
            label: 'Malang Kota → Surabaya Kota',
            price: 800000,
            value: 'Malang Kota → Surabaya Kota'
          },
          {
            label: 'Malang Kota → Surabaya Tanjung Perak',
            price: 800000,
            value: 'Malang Kota → Surabaya Tanjung Perak'
          }
        ]
      }
    }
  },
  'blitar': {
    label: 'Blitar Kota',
    needsPicker: true,
    units: {
      calya: {
        label: 'Calya / Avanza',
        routes: [
          {
            label: 'Blitar Kota → Juanda',
            price: 700000,
            value: 'Blitar Kota → Juanda'
          },
          {
            label: 'Blitar Kota → Surabaya Kota',
            price: 800000,
            value: 'Blitar Kota → Surabaya Kota'
          },
          {
            label: 'Blitar Kota → Tanjung Perak',
            price: 800000,
            value: 'Blitar Kota → Tanjung Perak'
          }
        ]
      },
      innova: {
        label: 'Innova Reborn',
        routes: [
          {
            label: 'Blitar Kota → Juanda',
            price: 800000,
            value: 'Blitar Kota → Juanda'
          },
          {
            label: 'Blitar Kota → Surabaya Kota',
            price: 900000,
            value: 'Blitar Kota → Surabaya Kota'
          },
          {
            label: 'Blitar Kota → Tanjung Perak',
            price: 900000,
            value: 'Blitar Kota → Tanjung Perak'
          }
        ]
      }
    }
  },
  'surabaya-kota': {
    label: 'Surabaya Kota',
    needsPicker: true,
    units: {
      calya: {
        label: 'Calya / Avanza',
        routes: [
          {
            label: 'Surabaya Kota → Malang',
            price: 550000,
            value: 'Surabaya Kota → Malang'
          },
          {
            label: 'Surabaya Kota → Blitar',
            price: 700000,
            value: 'Surabaya Kota → Blitar'
          }
        ]
      },
      innova: {
        label: 'Innova Reborn',
        routes: [
          {
            label: 'Surabaya Kota → Malang',
            price: 700000,
            value: 'Surabaya Kota → Malang'
          },
          {
            label: 'Surabaya Kota → Blitar',
            price: 800000,
            value: 'Surabaya Kota → Blitar'
          }
        ]
      }
    }
  },
  'surabaya-juanda': {
    label: 'Surabaya - Juanda',
    needsPicker: false,
    units: {
      calya: {
        label: 'Calya / Avanza',
        routes: [
          {
            label: 'Surabaya Juanda → Malang',
            price: 650000,
            value: 'Surabaya Juanda → Malang'
          },
          {
            label: 'Surabaya Juanda → Blitar',
            price: 800000,
            value: 'Surabaya Juanda → Blitar'
          }
        ]
      },
      innova: {
        label: 'Innova Reborn',
        routes: [
          {
            label: 'Surabaya Juanda → Malang',
            price: 800000,
            value: 'Surabaya Juanda → Malang'
          },
          {
            label: 'Surabaya Juanda → Blitar',
            price: 900000,
            value: 'Surabaya Juanda → Blitar'
          }
        ]
      }
    }
  },
  'surabaya-tanjungperak': {
    label: 'Surabaya - Tanjung Perak',
    needsPicker: false,
    units: {
      calya: {
        label: 'Calya / Avanza',
        routes: [
          {
            label: 'Surabaya Tanjung Perak → Malang',
            price: 650000,
            value: 'Surabaya Tanjung Perak → Malang'
          },
          {
            label: 'Surabaya Tanjung Perak → Blitar',
            price: 800000,
            value: 'Surabaya Tanjung Perak → Blitar'
          }
        ]
      },
      innova: {
        label: 'Innova Reborn',
        routes: [
          {
            label: 'Surabaya Tanjung Perak → Malang',
            price: 800000,
            value: 'Surabaya Tanjung Perak → Malang'
          },
          {
            label: 'Surabaya Tanjung Perak → Blitar',
            price: 900000,
            value: 'Surabaya Tanjung Perak → Blitar'
          }
        ]
      }
    }
  }
}

// ===== STATE =====
// PERBAIKAN: Mengosongkan default value city dan unit agar tidak memicu picker di awal load
const state = reactive({
  name: '',
  city: '',
  unit: '',
  route: '',
  date: '',
  pickupLocation: null,
  dropoffLocation: null
})

// ===== COMPUTED OPTIONS =====
const cityOptions = computed(() =>
  Object.entries(carterData).map(([key, val]) => ({
    value: key,
    label: val.label
  }))
)

const unitOptions = computed(() => {
  if (!state.city) return []
  return Object.entries(carterData[state.city].units).map(([key, val]) => ({
    value: key,
    label: val.label
  }))
})

const routeOptions = computed(() => {
  if (!state.city || !state.unit) return []
  return carterData[state.city].units[state.unit].routes.map(r =>
    r?.type ? r : { value: r.label, label: r.label, price: r.price }
  )
})

const selectedPrice = computed(() => {
  const found = routeOptions.value.find(r => r.value === state.route)
  return found ? found.price : null
})

const formatPrice = price => 'Rp ' + price.toLocaleString('id-ID')

// ===== LOGIKA DETEKSI LOCATION PICKER =====
// Hanya memproses jika state.city sudah bernilai (tidak kosong)
const originNeedsPicker = computed(() => {
  if (!state.city) return false
  return carterData[state.city]?.needsPicker ?? false
})

const destinationNeedsPicker = computed(() => {
  if (!state.route) return false
  const destPart = state.route.toLowerCase().split('→')[1] || ''
  return (
    destPart.includes('malang')
    || destPart.includes('blitar')
    || destPart.includes('surabaya kota')
  )
})

// ===== WATCHERS (RESET STATE) =====
watch(
  () => state.city,
  (newCity) => {
    state.unit = newCity ? 'calya' : '' // Set default unit jika kota dipilih
    state.route = ''
    state.pickupLocation = null
    state.dropoffLocation = null
  }
)

watch(
  () => state.unit,
  () => {
    state.route = ''
    state.pickupLocation = null
    state.dropoffLocation = null
  }
)

watch(
  () => state.route,
  () => {
    state.dropoffLocation = null
    emitFormChange()
  }
)

// ===== VALIDASI SCHEMA =====
const schema = z
  .object({
    name: z.string().min(3, 'Nama tidak boleh kosong'),
    city: z.string().min(1, 'Kota asal wajib dipilih'),
    unit: z.string().min(1, 'Kendaraan wajib dipilih'),
    route: z.string().min(1, 'Rute wajib dipilih'),
    date: z.string().min(1, 'Tanggal perjalanan wajib diisi'),
    pickupLocation: z.any().nullable(),
    dropoffLocation: z.any().nullable()
  })
  .refine(
    (data) => {
      if (!data.city) return true
      const needsPicker = carterData[data.city]?.needsPicker
      return needsPicker ? !!data.pickupLocation : true
    },
    {
      message: 'Titik jemput wajib ditentukan di peta',
      path: ['pickupLocation']
    }
  )
  .refine(
    (data) => {
      if (!data.route) return true
      const destPart = data.route.toLowerCase().split('→')[1] || ''
      const needsPicker
        = destPart.includes('malang')
          || destPart.includes('blitar')
          || destPart.includes('surabaya kota')
      return needsPicker ? !!data.dropoffLocation : true
    },
    {
      message: 'Titik tujuan wajib ditentukan di peta',
      path: ['dropoffLocation']
    }
  )

// ===== ACTIONS =====
async function onSubmit(event) {
  sendCarterBookingForm({
    ...event?.data,
    name: event.data.name,
    pickupLabel: event.data.city,
    route: event.data.route,
    unitType: event.data.unit,
    pickupLocation: state.pickupLocation,
    dropoffLocation: state.dropoffLocation,
    price: selectedPrice.value
  })
}

function closeModal() {
  emits('closeModal')
}

const customInputUi = {
  base: 'focus:!border-[#0b1c3d] focus:!ring-[#0b1c3d] dark:!focus:border-[#0b1c3d] dark:focus:!ring-[#0b1c3d]'
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto p-2 sm:p-4">
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-5"
      @submit="onSubmit"
    >
      <div class="w-full h-80 md:h-fit overflow-auto p-4 space-y-4">
        <!-- Nama Lengkap -->
        <UFormField
          label="Nama Lengkap"
          name="name"
        >
          <UInput
            v-model="state.name"
            :ui="customInputUi"
            class="w-full"
            placeholder="Masukkan nama lengkap"
          />
        </UFormField>

        <!-- Kota Asal (Ditambahkan placeholder agar bersih di awal) -->
        <UFormField
          label="Kota Asal"
          name="city"
        >
          <USelect
            v-model="state.city"
            :items="cityOptions"
            value-key="value"
            label-key="label"
            placeholder="Pilih kota asal..."
            :ui="customInputUi"
            class="w-full"
          />
        </UFormField>

        <!-- LocationPicker Titik Jemput -->
        <Transition name="fade">
          <UFormField
            v-if="originNeedsPicker"
            label="Titik Jemput Spesifik (Alamat/Gedung)"
            name="pickupLocation"
          >
            <LocationPicker
              v-model="state.pickupLocation"
              placeholder="Cari jalan / perumahan / titik jemput..."
            />
          </UFormField>
        </Transition>

        <!-- Tipe Kendaraan -->
        <UFormField
          label="Tipe Kendaraan"
          name="unit"
        >
          <USelect
            v-model="state.unit"
            :items="unitOptions"
            value-key="value"
            label-key="label"
            placeholder="Pilih tipe kendaraan..."
            :ui="customInputUi"
            class="w-full"
          />
        </UFormField>

        <!-- Rute Tujuan -->
        <UFormField
          label="Rute Tujuan"
          name="route"
        >
          <USelect
            v-model="state.route"
            :items="routeOptions"
            value-key="value"
            label-key="label"
            placeholder="Pilih rute tujuan..."
            :ui="customInputUi"
            class="w-full"
          />
        </UFormField>

        <!-- LocationPicker Titik Tujuan -->
        <Transition name="fade">
          <UFormField
            v-if="destinationNeedsPicker"
            label="Titik Pengantaran Spesifik (Alamat/Gedung)"
            name="dropoffLocation"
          >
            <LocationPicker
              v-model="state.dropoffLocation"
              placeholder="Cari jalan / perumahan / titik turun..."
            />
          </UFormField>
        </Transition>

        <!-- Estimasi Harga Box -->
        <Transition name="fade">
          <div
            v-if="selectedPrice"
            class="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
          >
            <div>
              <p class="text-xs text-slate-400">
                Estimasi harga carter
              </p>
              <p class="text-sm font-bold text-slate-800">
                {{ formatPrice(selectedPrice) }}
              </p>
            </div>
            <div class="text-xs text-slate-400 text-right">
              <p>Akses full tol</p>
              <p>Driver + BBM included</p>
            </div>
          </div>
        </Transition>

        <!-- Tanggal Perjalanan -->
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

        <!-- Tombol Aksi -->
        <div
          class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2"
        >
          <UButton
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
            Pesan via WhatsApp
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
