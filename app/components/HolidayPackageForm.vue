<script setup lang="ts">
import { useWhatsApp } from '@/composables/useWhatsApp'
import { z } from 'zod'

const props = defineProps<{
  holidayType: string
  showCancel?: boolean
}>()

const emits = defineEmits(['closeModal'])
const { sendHolidayTravelBooking } = useWhatsApp()

const wisataData: Record<
  string,
  {
    label: string
    desc: string
    suffix: string
    units: { value: string, label: string, price: number }[]
  }
> = {
  'wisata-batu': {
    label: 'Wisata Kota Batu',
    desc: '08:00 - 20:00 · Driver, Mobil, BBM',
    suffix: '/hari',
    units: [
      { value: 'calya', label: 'Calya / Avanza', price: 600000 },
      { value: 'innova', label: 'Innova Reborn', price: 800000 },
      { value: 'hiace', label: 'Hiace / Elf', price: 1200000 }
    ]
  },
  'bromo': {
    label: 'Wisata Gunung Bromo',
    desc: 'Sunrise / Sunset · Jeep, Mobil, Driver, BBM',
    suffix: '',
    units: [
      { value: 'avanza', label: 'Avanza', price: 1500000 },
      { value: 'innova', label: 'Innova Reborn', price: 1700000 },
      { value: 'hiace', label: 'Hiace / Elf', price: 2200000 }
    ]
  },
  'batu-bromo': {
    label: 'Batu - Bromo (2D1N)',
    desc: 'Jeep, Mobil, Driver, BBM',
    suffix: '',
    units: [
      { value: 'avanza', label: 'Avanza', price: 2400000 },
      { value: 'innova', label: 'Innova Reborn', price: 2700000 },
      { value: 'hiace', label: 'Hiace / Elf', price: 3500000 }
    ]
  }
}

const currentPackage = computed(() => wisataData[props.holidayType] ?? null)
const unitOptions = computed(() => currentPackage.value?.units ?? [])
const selectedPrice = computed(() => {
  if (!state.unit) return null
  return (
    currentPackage.value?.units.find(u => u.value === state.unit)?.price
    ?? null
  )
})
const formatPrice = (price: number) => 'Rp ' + price.toLocaleString('id-ID')

const state = reactive({ name: '', unit: '', date: '' })

watch(
  () => props.holidayType,
  () => {
    state.unit = ''
  }
)

const schema = z.object({
  name: z.string().min(3, 'Nama tidak boleh kosong'),
  unit: z.string().min(1, 'Kendaraan wajib dipilih'),
  date: z.string().min(1, 'Tanggal perjalanan wajib diisi')
})

interface HolidayFormData {
  name: string
  unit: string
  date: string
}

async function onSubmit(event: HolidayFormData) {
  sendHolidayTravelBooking({ ...event, holidayType: props?.holidayType })
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
      v-if="showCancel"
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
            Form Booking Paket Wisata
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
      @submit="(e) => onSubmit(e?.data)"
    >
      <div class="w-full h-80 md:h-fit overflow-auto p-4 space-y-4">
        <!-- Info Paket -->
        <div
          v-if="currentPackage && !showCancel"
          class="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
        >
          <p class="text-xs text-slate-400 mb-1">
            Paket dipilih
          </p>
          <p class="text-sm font-bold text-slate-800">
            {{ currentPackage.label }}
          </p>
          <p class="text-xs text-slate-500 mt-0.5">
            {{ currentPackage.desc }}
          </p>
        </div>

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
          label="Tipe Kendaraan"
          name="unit"
        >
          <USelect
            v-model="state.unit"
            :items="unitOptions"
            value-key="value"
            label-key="label"
            placeholder="Pilih kendaraan..."
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
                {{ formatPrice(selectedPrice) }}{{ currentPackage?.suffix }}
              </p>
            </div>
            <div class="text-xs text-slate-400 text-right">
              <p>{{ currentPackage?.desc }}</p>
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
            @click="(e: any) => e.target.showPicker?.()"
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
