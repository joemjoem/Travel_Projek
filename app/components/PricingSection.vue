<template>
  <section class="py-20 bg-slate-50 dark:bg-slate-950">
    <div class="container mx-auto px-4">
      <h2
        class="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
      >
        Harga Layanan
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <UCard
          class="overflow-hidden shadow-md"
          :ui="{
            header: 'p-0 sm:p-0',
          }"
        >
          <template #header>
            <div class="bg-slate-900 text-white p-4">
              <h3 class="font-bold text-lg">Paket Reguler</h3>
              <p class="text-xs text-slate-400">
                Antar jemput rute langsung terjadwal
              </p>
            </div>
          </template>
          <div class="space-y-4">
            <div
              v-for="(rute, i) in regulerRoutes"
              :key="i"
              class="flex justify-between items-center pb-3 border-b border-slate-100 last:border-0"
            >
              <div>
                <p class="text-sm font-semibold text-slate-800">
                  {{ rute.title }}
                </p>
                <span class="text-xs text-slate-400">{{ rute.sub }}</span>
              </div>
              <UBadge color="slate" variant="solid">Rp {{ rute.price }}</UBadge>
            </div>
          </div>
        </UCard>

        <UCard
          class="overflow-hidden shadow-md"
          :ui="{
            header: 'p-0 sm:p-0',
          }"
        >
          <template #header>
            <div class="bg-slate-900 text-white p-4">
              <h3 class="font-bold text-lg">Carter Drop</h3>
              <p class="text-xs text-slate-400">
                Sewa privat sekali jalan gratis bensin dan supir
              </p>
            </div>
          </template>
          <div class="space-y-4">
            <div
              v-for="(car, i) in carterPrices"
              :key="i"
              class="flex justify-between items-center pb-3 border-b border-slate-100 last:border-0"
            >
              <div>
                <p class="text-sm font-semibold text-slate-800">
                  {{ car.name }}
                </p>
                <span class="text-xs text-slate-400">{{ car.capacity }}</span>
              </div>
              <UBadge color="emerald" variant="solid"
                >Rp {{ car.price }}</UBadge
              >
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup>
const regulerRoutes = [
  {
    title: "Jember ➔ Surabaya",
    sub: "Keberangkatan Pagi/Malam",
    price: "150.000",
  },
  { title: "Banyuwangi ➔ Jember", sub: "Keberangkatan Sore", price: "120.000" },
  {
    title: "Malang ➔ Surabaya",
    sub: "Keberangkatan Tiap Jam",
    price: "100.000",
  },
];

const carterPrices = [
  {
    name: "Avanza / Xenia",
    capacity: "Kapasitas maks. 5 Penumpang",
    price: "650.000",
  },
  {
    name: "Innova Reborn",
    capacity: "Kapasitas maks. 7 Penumpang",
    price: "850.000",
  },
  {
    name: "Hiace Commuter",
    capacity: "Kapasitas maks. 14 Penumpang",
    price: "1.200.000",
  },
];
</script>
