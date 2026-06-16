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
const { sendCarterBookingForm } = useWhatsApp()

const carterData = {
  malang: {
    label: 'Malang Kota',
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
  blitar: {
    label: 'Blitar Kota',
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
  surabaya: {
    label: 'Surabaya Kota/Juanda/Tanjung Perak',
    units: {
      calya: {
        label: 'Calya / Avanza',
        routes: [
          { type: 'label', label: 'ke Malang' },
          {
            label: 'Surabaya Kota → Malang',
            price: 550000,
            value: 'Surabaya Kota → Malang'
          },
          {
            label: 'Surabaya Juanda → Malang',
            price: 650000,
            value: 'Surabaya Juanda → Malang'
          },
          {
            label: 'Surabaya Tanjung Perak → Malang',
            price: 650000,
            value: 'Surabaya Tanjung Perak → Malang'
          },
          { type: 'label', label: 'ke Blitar' },
          {
            label: 'Surabaya Kota → Blitar',
            price: 700000,
            value: 'Surabaya Kota → Blitar'
          },
          {
            label: 'Surabaya Juanda → Blitar',
            price: 800000,
            value: 'Surabaya Juanda → Blitar'
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
          { type: 'label', label: 'ke Malang' },
          {
            label: 'Surabaya Kota → Malang',
            price: 700000,
            value: 'Surabaya Kota → Malang'
          },
          {
            label: 'Surabaya Juanda → Malang',
            price: 800000,
            value: 'Surabaya Juanda → Malang'
          },
          {
            label: 'Surabaya Tanjung Perak → Malang',
            price: 800000,
            value: 'Surabaya Tanjung Perak → Malang'
          },
          { type: 'label', label: 'ke Blitar' },
          {
            label: 'Surabaya Kota → Blitar',
            price: 800000,
            value: 'Surabaya Kota → Blitar'
          },
          {
            label: 'Surabaya Juanda → Blitar',
            price: 900000,
            value: 'Surabaya Juanda → Blitar'
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

const state = reactive({
  name: '',
  city: 'malang',
  unit: 'calya',
  route: '',
  date: ''
})

const cityOptions = computed(() =>
  Object.entries(carterData).map(([key, val]) => ({
    value: key,
    label: val.label
  }))
)
const unitOptions = computed(() =>
  Object.entries(carterData[state.city].units).map(([key, val]) => ({
    value: key,
    label: val.label
  }))
)
const routeOptions = computed(() =>
  carterData[state.city].units[state.unit].routes.map(r =>
    r?.type ? r : { value: r.label, label: r.label, price: r.price }
  )
)
const selectedPrice = computed(() => {
  const found = routeOptions.value.find(r => r.value === state.route)
  return found ? found.price : null
})
const formatPrice = price => 'Rp ' + price.toLocaleString('id-ID')

watch(
  () => state.city,
  () => {
    state.unit = 'calya'
    state.route = ''
  }
)
watch(
  () => state.unit,
  () => {
    state.route = ''
  }
)

const schema = z.object({
  name: z.string().min(3, 'Nama tidak boleh kosong'),
  city: z.string().min(1, 'Kota asal wajib dipilih'),
  unit: z.string().min(1, 'Kendaraan wajib dipilih'),
  route: z.string().min(1, 'Rute wajib dipilih'),
  date: z.string().min(1, 'Tanggal perjalanan wajib diisi')
})

async function onSubmit(event) {
  sendCarterBookingForm(event?.data)
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
    <!-- Header — hanya tampil di modal -->
    <div
      v-if="props?.showCancel"
      class="flex items-center justify-between gap-3 p-4"
    >
      <div class="flex items-center gap-2">
        <div
          class="flex items-center justify-center p-2 bg-emerald-50 text-emerald-600 rounded-lg dark:bg-emerald-950/50 dark:text-emerald-400"
        >
          <UIcon
            name="i-heroicons-ticket"
            class="w-6 h-6"
          />
        </div>
        <div>
          <h3
            class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white"
          >
            Form Booking Carter Drop
          </h3>
          <p class="text-xs text-slate-500">
            Silakan lengkapi data perjalanan Anda
          </p>
        </div>
      </div>
      <div
        class="p-1 hover:bg-slate-100/30 flex items-center justify-center rounded hover:cursor-pointer"
        @click="closeModal"
      >
        <UIcon
          name="i-lucide-x"
          class="w-6 h-6"
        />
      </div>
    </div>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-5"
      @submit="onSubmit"
    >
      <div class="w-full h-80 md:h-fit overflow-auto p-4 space-y-4">
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
        <UFormField
          label="Kota Asal"
          name="city"
        >
          <USelect
            v-model="state.city"
            :items="cityOptions"
            value-key="value"
            label-key="label"
            :ui="customInputUi"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Tipe Kendaraan"
          name="unit"
        >
          <USelect
            v-model="state.unit"
            :items="unitOptions"
            value-key="value"
            label-key="label"
            :ui="customInputUi"
            class="w-full"
          />
        </UFormField>
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

        <Transition name="fade">
          <div
            v-if="selectedPrice"
            class="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
          >
            <div>
              <p class="text-xs text-slate-400">
                Estimasi harga
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
