<template>
  <section class="py-20 bg-white dark:bg-slate-900">
    <div class="container mx-auto px-4 max-w-3xl">
      <h2
        class="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
      >
        FAQ SIWAKERTA Travel
      </h2>

      <UAccordion
        :items="faqItems"
        :ui="{
          wrapper: 'flex flex-col gap-3',
          item: 'p-4 bg-slate-50 dark:bg-slate-800 rounded-lg',
        }"
      >
        <template #default="{ item, open }">
          <UButton
            color="slate"
            variant="ghost"
            class="w-full flex justify-between items-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
          >
            <span
              class="font-semibold text-left text-slate-900 dark:text-white text-sm"
              >{{ item.label }}</span
            >
            <UIcon
              :name="
                open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'
              "
              class="w-5 h-5 text-slate-500"
            />
          </UButton>
        </template>
        <template #content="{ item }">
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ item.content }}
          </p>
        </template>
      </UAccordion>
    </div>
  </section>
</template>

<script setup>
const faqItems = [
  {
    label: "Daerah mana saja yang dijangkau?",
    content:
      "Layanan utama kami melayani seluruh area Jawa Timur, khususnya rute Surabaya, Malang, Jember, Banyuwangi, serta carter drop ke luar provinsi sesuai kesepakatan.",
  },
  {
    label: "Apakah tiket sudah termasuk tol?",
    content:
      "Untuk layanan Carter Drop, biaya tol biasanya disesuaikan berdasarkan kesepakatan paket, sedangkan tiket reguler melewati jalur utama non-tol kecuali diminta seluruh penumpang.",
  },
  {
    label: "Bagaimana jika saya ingin membatalkan perjalanan?",
    content:
      "Pembatalan dapat dilakukan selambat-lambatnya 6 jam sebelum keberangkatan dengan menghubungi CS kami agar tidak dikenakan biaya charge operasional.",
  },
];
</script>
