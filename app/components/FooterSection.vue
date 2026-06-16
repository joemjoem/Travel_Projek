<script setup>
import { useWhatsApp } from '@/composables/useWhatsApp'

const { sendMessageToAdmin } = useWhatsApp()

const config = useRuntimeConfig()
const waNumber = config.public.waNumber
const travelName = config.public.travelName
</script>

<template>
  <footer
    class="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900"
  >
    <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="space-y-4">
        <div class="flex items-center gap-2 text-white">
          <!-- <div
            class="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-slate-950"
          >
            S
          </div> -->
          <span class="font-bold tracking-wider text-lg">{{ travelName }}</span>
        </div>
        <p class="text-xs leading-relaxed text-slate-500">
          Penyedia layanan transportasi dan travel terpercaya di Jawa Timur.
          Mengutamakan keselamatan, keamanan, dan kenyamanan perjalanan Anda.
        </p>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-bold text-white uppercase tracking-wider">
          Navigasi Cepat
        </h4>
        <ul class="text-xs space-y-2">
          <li>
            <a
              href="#home"
              class="hover:text-emerald-400 transition"
            >Home</a>
          </li>
          <li>
            <a
              href="#layanan"
              class="hover:text-emerald-400 transition"
            >Layanan Travel</a>
          </li>
          <!-- <li>
            <a href="#tentang" class="hover:text-emerald-400 transition"
              >Tentang Kami</a
            >
          </li>
          <li>
            <a href="#kontak" class="hover:text-emerald-400 transition"
              >Kontak CS</a
            >
          </li> -->
        </ul>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-bold text-white uppercase tracking-wider">
          Kantor Pusat
        </h4>
        <p class="text-xs text-slate-500 leading-relaxed">
          Jl. Raya Siwakerta No. 123,<br>
          Surabaya, Jawa Timur, Indonesia
        </p>
        <div
          class="pt-2 flex items-center gap-2 text-xs text-emerald-400 hover:cursor-pointer hover:text-emrald-300"
          @click="sendMessageToAdmin"
        >
          <UIcon
            name="i-heroicons-phone"
            class="w-4 h-4"
          />
          <span>{{ waNumber }}</span>
        </div>
      </div>
    </div>

    <div
      class="container mx-auto px-4 mt-12 pt-6 border-t border-slate-900 text-center text-slate-600 text-xs"
    >
      <p>
        &copy; 2026 PT. SIWAKERTA. All rights reserved. Built with Nuxt 4 &
        Nuxt/UI.
      </p>
    </div>
  </footer>
</template>
