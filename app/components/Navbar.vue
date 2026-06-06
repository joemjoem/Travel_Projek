<template>
  <nav
    class="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800"
  >
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-slate-950"
        >
          S
        </div>
        <span class="font-bold tracking-wider text-lg">PT. SIWAKERTA</span>
      </div>

      <div
        class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300"
      >
        <a href="#home" class="hover:text-emerald-400 transition">Home</a>
        <a href="#layanan" class="hover:text-emerald-400 transition"
          >Layanan Travel</a
        >
        <a href="#tentang" class="hover:text-emerald-400 transition"
          >Tentang Kami</a
        >
        <a href="#kontak" class="hover:text-emerald-400 transition">Kontak</a>
      </div>

      <div class="hidden md:block">
        <UButton color="emerald" variant="ghost" icon="i-heroicons-phone"
          >CS Resmi</UButton
        >
      </div>
    </div>
  </nav>
</template>
