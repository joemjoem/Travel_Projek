<script setup>
import NavbarSection from "./components/NavbarSection.vue";

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "id",
    class: "light",
    "data-theme": "light",
    style: "color-scheme: light;",
  },
});

const title =
  "AG Jaya Tour & Travel – Sewa Mobil & Paket Wisata Malang, Blitar, Surabaya";
const description = "Travel murah Malang, Blitar, dan Surabaya";
const siteUrl = "https://agjayatravel.id";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${siteUrl}/image/logo.png`,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans">
    <NavbarSection />

    <main>
      <NuxtPage />
      <FloatingButton />
    </main>

    <FooterSection />
  </div>
</template>
