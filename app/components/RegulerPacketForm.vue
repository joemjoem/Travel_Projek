<script setup>
import { z } from 'zod'

const emits = defineEmits(['closeModal'])
const toast = useToast()

const kotaOptions = [
  'Surabaya Kota',
  'Blitar',
  'Malang Kota',
  'Juanda',
  'Tanjung Perak Surabaya'
]

const schema = z
  .object({
    name: z.string().min(3, 'Nama tidak boleh kosong'),
    start: z.string().min(1, 'Asal wajib dipilih'),
    destination: z.string().min(1, 'Tujuan wajib dipilih'),
    date: z.string().min(1, 'Tanggal perjalanan wajib diisi'),
    totalPessanger: z.number().min(1, 'Minimal 1 penumpang')
  })
  .refine(data => data.start !== data.destination, {
    message: 'Asal dan tujuan tidak boleh sama',
    path: ['destination']
  })

const state = reactive({
  name: '',
  asal: 'Surabaya',
  tujuan: 'Blitar',
  tanggal: '',
  penumpang: 1
})

function closeModal() {
  emits('closeModal')
}

async function onSubmit(event) {
  console.log('Data:', event.data)
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
      <div class="w-full h-80 md:h-fit overflow-auto p-4 space-y-4">
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

        <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div class="sm:col-span-6">
            <UFormField
              label="Kota Asal"
              name="start"
            >
              <USelect
                v-model="state.start"
                :items="kotaOptions"
                :ui="customInputUi"
                class="w-full"
              />
            </UFormField>
          </div>
          <div class="sm:col-span-6">
            <UFormField
              label="Kota Tujuan"
              name="destination"
            >
              <USelect
                v-model="state.destination"
                :items="kotaOptions"
                :ui="customInputUi"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>

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
