<template>
  <nav
    class="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800"
  >
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-slate-950"
        >
          S
        </div>
        <span class="font-bold tracking-wider text-lg">PT. SIWAKERTA</span>
      </div>

      <!-- Desktop Nav -->
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

      <!-- Desktop CTA -->
      <div class="hidden md:block">
        <UButton color="emerald" variant="ghost" icon="i-heroicons-phone"
          >CS Resmi</UButton
        >
      </div>

      <!-- Hamburger (mobile only) -->
      <UButton
        class="md:hidden"
        color="gray"
        variant="ghost"
        :icon="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      />
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="menuOpen"
        class="md:hidden border-t border-slate-800 bg-slate-950 px-4 pb-4"
      >
        <div
          class="flex flex-col gap-1 pt-3 text-sm font-medium text-slate-300"
        >
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-emerald-400 transition"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </a>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-800">
          <UButton
            color="emerald"
            variant="ghost"
            icon="i-heroicons-phone"
            class="w-full justify-center"
          >
            CS Resmi
          </UButton>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const menuOpen = ref(false);

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#layanan", label: "Layanan Travel" },
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#kontak", label: "Kontak" },
];

// Tutup menu saat resize ke desktop
onMounted(() => {
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) menuOpen.value = false;
  });
});
</script>
