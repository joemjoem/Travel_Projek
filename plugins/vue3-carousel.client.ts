// plugins/vue3-carousel.client.ts   ← .client = hanya jalan di browser
import { defineNuxtPlugin } from '#app'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Carousel', Carousel)
  nuxtApp.vueApp.component('Slide', Slide)
  nuxtApp.vueApp.component('Pagination', Pagination)
  nuxtApp.vueApp.component('Navigation', Navigation)
})