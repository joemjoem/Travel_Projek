<script setup>
import { useWhatsApp } from '@/composables/useWhatsApp'
import { z } from 'zod'

const emits = defineEmits(['closeModal'])
const toast = useToast()
const { sendRegulerBookingForm } = useWhatsApp()

// Rute fix - tidak ada kombinasi bebas asal/tujuan
const routeOptions = [
  {
    type: 'label',
    label: 'dari Malang'
  },
  { value: 'Malang - Surabaya Juanda', label: 'Malang ⇌ Juanda' },
  { value: 'Malang - Surabaya', label: 'Malang ⇌ Surabaya Kota' },
  {
    value: 'Malang - Surabaya Tanjung Perak',
    label: 'Malang ⇌ Surabaya Tanjung Perak'
  },
  { value: 'Malang - Blitar', label: 'Malang ⇌ Blitar' },
  {
    type: 'separator'
  },
  {
    type: 'label',
    label: 'dari Blitar'
  },
  { value: 'Blitar - Surabaya Juanda', label: 'Blitar ⇌ Juanda' },
  { value: 'Blitar - Surabaya', label: 'Blitar ⇌ Surabaya Kota' },
  {
    value: 'Blitar - Surabaya Tanjung Perak',
    label: 'Blitar ⇌ Surabaya Tanjung Perak'
  },
  { value: 'Blitar - Malang Kota', label: 'Blitar ⇌ Malang Kota' },
  {
    type: 'separator'
  },
  {
    type: 'label',
    label: 'dari Surabaya'
  },
  {
    value: 'Surabaya Tanjung Perak - Blitar',
    label: 'Surabaya Tanjung Perak ⇌ Blitar'
  },
  {
    value: 'Surabaya Juanda - Blitar',
    label: 'Surabaya Juanda ⇌ Blitar'
  },
  {
    value: 'Surabaya Tanjung Perak - Malang',
    label: 'Surabaya Tanjung Perak ⇌ Malang'
  },
  {
    value: 'Surabaya Juanda - Malang',
    label: 'Surabaya Juanda ⇌ Malang'
  }
]

const schema = z.object({
  name: z.string().min(3, 'Nama tidak boleh kosong'),
  route: z.string().min(1, 'Rute wajib dipilih'),
  date: z.string().min(1, 'Tanggal perjalanan wajib diisi'),
  totalPessanger: z.number().min(1, 'Minimal 1 penumpang')
})

const state = reactive({
  name: '',
  route: routeOptions[1].value,
  date: '',
  totalPessanger: 1
})

function closeModal() {
  emits('closeModal')
}

async function onSubmit(event) {
  sendRegulerBookingForm({
    ...event.data
  })
  toast.add({ title: 'Pemesanan Berhasil!', color: 'success' })
}

// Konfigurasi UI untuk memaksakan border aktif berwarna #0b1c3d
const customInputUi = {
  base: 'focus:!border-[#0b1c3d] focus:!ring-[#0b1c3d] dark:!focus:border-[#0b1c3d] dark:focus:!ring-[#0b1c3d]'
}
</script>

<template>
  <!-- RESPONSIF: max-w disesuaikan agar fleksibel di mobile sampai desktop -->
  <div class="w-full max-w-lg mx-auto p-2 sm:p-4">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3 p-4">
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
            Form Pemesanan Tiket
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

    <!-- Form -->
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-5"
      @submit="onSubmit"
    >
      <div class="w-full h-96 md:h-fit overflow-auto p-4 space-y-4">
        <!-- Input Nama -->
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

        <!-- Rute - Radio Group -->
        <UFormField
          label="Pilih Rute"
          name="route"
        >
          <USelect
            v-model="state.route"
            :items="routeOptions"
            value-key="value"
            label-key="label"
            placeholder="Pilih rute perjalanan..."
            class="w-full"
          />
        </UFormField>

        <!-- RESPONSIF Input Tanggal & Jumlah Penumpang -->
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

        <!-- Tombol Aksi: Otomatis full-width di mobile, rapi di desktop -->
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
            Pesan Sekarang
          </UButton>
        </div>
      </div>
    </UForm>
  </div>
</template>
