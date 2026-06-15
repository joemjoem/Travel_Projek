<script setup>
// ===== TRAVEL REGULER =====
const regulerCity = ref("blitar");

const regulerData = {
  blitar: {
    label: "Blitar",
    startFrom: "170.000",
    note: "Akses Tol",
    routes: [
      "Blitar ⇌ Juanda",
      "Blitar ⇌ Surabaya Kota",
      "Blitar ⇌ Tanjung Perak",
      "Blitar ⇌ Malang Kota",
    ],
  },
  malang: {
    label: "Malang",
    startFrom: "150.000",
    note: "Akses Tol",
    routes: [
      "Malang ⇌ Juanda",
      "Malang ⇌ Surabaya Kota",
      "Malang ⇌ Tanjung Perak",
    ],
  },
};

// ===== CARTER DROP =====
const carterCity = ref("blitar");

const carterData = {
  blitar: {
    label: "Blitar Kota",
    groups: [
      {
        unit: "Calya / Avanza",
        routes: [
          { title: "Blitar Kota → Juanda", price: "700.000" },
          { title: "Blitar Kota → Surabaya Kota", price: "800.000" },
          { title: "Blitar Kota → Tanjung Perak", price: "800.000" },
        ],
      },
      {
        unit: "Innova Reborn",
        routes: [
          { title: "Blitar Kota → Juanda", price: "800.000" },
          { title: "Blitar Kota → Surabaya Kota", price: "900.000" },
          { title: "Blitar Kota → Tanjung Perak", price: "900.000" },
        ],
      },
    ],
  },
  malang: {
    label: "Malang Kota",
    groups: [
      {
        unit: "Calya / Avanza",
        routes: [
          { title: "Malang Kota → Juanda", price: "550.000" },
          { title: "Malang Kota → Surabaya Kota", price: "650.000" },
          { title: "Malang Kota → Tanjung Perak", price: "650.000" },
        ],
      },
      {
        unit: "Innova Reborn",
        routes: [
          { title: "Malang Kota → Juanda", price: "700.000" },
          { title: "Malang Kota → Surabaya Kota", price: "800.000" },
          // NOTE: data asli tertulis "Sby Kota" dua kali (kemungkinan typo).
          // Diasumsikan rute ke-3 adalah Tanjung Perak. Perlu konfirmasi ke customer.
          { title: "Malang Kota → Tanjung Perak", price: "800.000" },
        ],
      },
    ],
  },
};

// ===== PAKET WISATA =====
const wisataPackages = [
  {
    title: "Wisata Kota Batu",
    desc: "08:00 - 20:00 · Termasuk Driver, Mobil, BBM",
    suffix: "/hari",
    tiers: [
      { unit: "Calya / Avanza", price: "600.000" },
      { unit: "Innova Reborn", price: "800.000" },
      { unit: "Hiace / Elf", price: "1.200.000" },
    ],
  },
  {
    title: "Wisata Gunung Bromo",
    desc: "Sunrise / Sunset · Termasuk Jeep, Mobil, Driver, BBM",
    suffix: "",
    tiers: [
      { unit: "Avanza", price: "1.500.000" },
      { unit: "Innova Reborn", price: "1.700.000" },
      { unit: "Hiace / Elf", price: "2.200.000" },
    ],
  },
  {
    title: "Batu - Bromo (2D1N)",
    desc: "Termasuk Jeep, Mobil, Driver, BBM",
    suffix: "",
    tiers: [
      { unit: "Avanza", price: "2.400.000" },
      { unit: "Innova Reborn", price: "2.700.000" },
      { unit: "Hiace / Elf", price: "3.500.000" },
    ],
  },
];
</script>

<template>
  <section class="py-20 bg-slate-50 dark:bg-slate-950">
    <div class="container mx-auto px-4">
      <h2
        class="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
      >
        Harga Layanan
      </h2>

      <!-- ===== ROW 1: REGULER & CARTER DROP ===== -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- TRAVEL REGULER -->
        <UCard class="overflow-hidden shadow-md" :ui="{ header: '!p-0' }">
          <template #header>
            <div
              class="bg-slate-900 text-white p-4 flex items-center justify-between gap-3"
            >
              <div>
                <h3 class="font-bold text-lg">Travel Reguler</h3>
                <p class="text-xs text-slate-400">
                  Antar jemput rute terjadwal
                </p>
              </div>
              <!-- City toggle -->
              <div class="flex gap-1 bg-slate-800 rounded-lg p-1 flex-shrink-0">
                <button
                  v-for="(data, key) in regulerData"
                  :key="key"
                  class="text-xs font-semibold px-3 py-1.5 rounded-md transition-colors"
                  :class="
                    regulerCity === key
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  "
                  @click="regulerCity = key"
                >
                  {{ data.label }}
                </button>
              </div>
            </div>
          </template>

          <div class="">
            <!-- Destinations -->
            <div>
              <p
                class="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2"
              >
                Destinasi
              </p>
              <ul class="space-y-3">
                <li
                  v-for="(route, i) in regulerData[regulerCity].routes"
                  :key="i"
                  class="flex items-center gap-2 pb-2 border-b border-slate-100 last:border-0 text-sm font-medium text-slate-800"
                >
                  <UIcon
                    name="i-lucide-map-pin"
                    class="w-4 h-4 flex-shrink-0"
                  />
                  {{ route }}
                </li>
              </ul>
            </div>

            <!-- Start from price -->
            <hr class="border-t border-slate-100 mb-2" />
            <div class="w-full">
              <div class="mb-2">
                <div class="flex items-center gap-2 mb-1">
                  <UIcon
                    name="i-lucide-circle-check"
                    class="w-4 h-4 flex-shrink-0 text-success-500"
                  />
                  <p class="text-xs text-slate-400">Harga per orang</p>
                </div>
                <div class="flex items-center gap-2 mb-1">
                  <UIcon
                    name="i-lucide-circle-check"
                    class="w-4 h-4 flex-shrink-0 text-success-500"
                  />
                  <p class="text-xs text-slate-400">Sudah include tol</p>
                </div>
                <div class="flex items-center gap-2 mb-1">
                  <UIcon
                    name="i-lucide-circle-check"
                    class="w-4 h-4 flex-shrink-0 text-success-500"
                  />
                  <p class="text-xs text-slate-400">Bebas antar ke T1 & T2</p>
                </div>
              </div>
              <div
                class="flex items-center justify-between p-2 rounded-md bg-slate-100/30"
              >
                <div>
                  <p class="text-sm font-semibold text-slate-800">Mulai dari</p>
                  <!-- <span class="text-xs text-slate-400">{{
                  regulerData[regulerCity].note
                }}</span> -->
                </div>
                <UBadge color="amber" variant="solid">
                  Rp {{ regulerData[regulerCity].startFrom }}
                </UBadge>
              </div>
            </div>
          </div>
        </UCard>

        <!-- CARTER DROP -->
        <UCard class="overflow-hidden shadow-md" :ui="{ header: '!p-0' }">
          <template #header>
            <div
              class="bg-slate-900 text-white p-4 flex items-center justify-between gap-3"
            >
              <div>
                <h3 class="font-bold text-lg">Carter Drop</h3>
                <p class="text-xs text-slate-400">
                  Sewa privat, akses full tol
                </p>
              </div>
              <!-- City toggle -->
              <div class="flex gap-1 bg-slate-800 rounded-lg p-1 flex-shrink-0">
                <button
                  v-for="(data, key) in carterData"
                  :key="key"
                  class="text-xs font-semibold px-3 py-1.5 rounded-md transition-colors"
                  :class="
                    carterCity === key
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  "
                  @click="carterCity = key"
                >
                  {{ data.label }}
                </button>
              </div>
            </div>
          </template>

          <div class="space-y-5">
            <div
              v-for="group in carterData[carterCity].groups"
              :key="group.unit"
            >
              <p
                class="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2"
              >
                {{ group.unit }}
              </p>
              <div class="space-y-3">
                <div
                  v-for="(route, i) in group.routes"
                  :key="i"
                  class="flex justify-between items-center pb-2 border-b border-slate-100 last:border-0"
                >
                  <p class="text-sm font-semibold text-slate-800">
                    {{ route.title }}
                  </p>
                  <UBadge color="emerald" variant="solid"
                    >Rp {{ route.price }}</UBadge
                  >
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- ===== ROW 2: PAKET WISATA ===== -->
      <div class="mt-12 max-w-6xl mx-auto">
        <h3
          class="text-xl font-bold text-center text-slate-900 dark:text-white mb-8"
        >
          Paket Wisata
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UCard
            v-for="pkg in wisataPackages"
            :key="pkg.title"
            class="overflow-hidden shadow-md"
            :ui="{ header: '!p-0' }"
          >
            <template #header>
              <div class="bg-slate-900 text-white p-4">
                <h3 class="font-bold text-lg">{{ pkg.title }}</h3>
                <p class="text-xs text-slate-400">{{ pkg.desc }}</p>
              </div>
            </template>

            <div class="space-y-3">
              <div
                v-for="(tier, i) in pkg.tiers"
                :key="i"
                class="flex justify-between items-center pb-2 border-b border-slate-100 last:border-0"
              >
                <p class="text-sm font-semibold text-slate-800">
                  {{ tier.unit }}
                </p>
                <UBadge color="amber" variant="solid">
                  Rp {{ tier.price }}{{ pkg.suffix }}
                </UBadge>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>
