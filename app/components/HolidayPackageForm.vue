<script setup lang="ts">
import z from 'zod'

const props = defineProps<{
  holidayType: string
}>()

const fleetList = [
  'Calya/Avanza',
  'Innova Reborn',
  'Hiace Commuter',
  'Hiace Premio'
]
const holidayType = computed(() => props?.holidayType)

// --------- handle close modal ---------
const emits = defineEmits(['closeModal'])

function closeModal() {
  emits('closeModal')
}

// --------- handle form schema ---------
const schema = z.object({
  name: z.string().min(3, 'Nama tidak boleh kosong'),
  fleet: z.string().min(1, 'Kendaraan wajib dipilih'),
  date: z.string().min(1, 'Tanggal perjalanan wajib diisi')
})

const state = reactive({
  name: '',
  fleet: '',
  date: ''
})

const customInputUi = {
  base: 'focus:!border-[#0b1c3d] focus:!ring-[#0b1c3d] dark:!focus:border-[#0b1c3d] dark:focus:!ring-[#0b1c3d]'
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto p-2 sm:p-4">
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
    <Uform
      :schema="schema"
      :state="state"
      class="space-y-5"
      @submit="() => {}"
    >
      <div class="w-full h-80 md:h-fit overflow-auto p-4 space-y-4">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-700">{{
            "Paket Wisata"
          }}</label>
          <div class="w-fit">
            <UBadge
              class="bg-slate-950"
              :label="holidayType || '-'"
            />
          </div>
        </div>
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
        <UFormField
          label="Tipe Kendaraan"
          name="fleet"
        >
          <USelect
            v-model="state.fleet"
            :items="fleetList"
            :ui="customInputUi"
            class="w-full"
          />
        </UFormField>
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
            Pesan Sekarang
          </UButton>
        </div>
      </div>
    </Uform>
  </div>
</template>
