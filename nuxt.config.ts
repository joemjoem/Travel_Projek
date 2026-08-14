// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    // '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/sitemap'
  ],
  devtools: {
    enabled: true
  },
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://agjayatravel.id',
    name: 'AG Jaya Tour & Travel',
    trailingSlash: true
  },
  ui: {
    colorMode: false
  },
  runtimeConfig: {
    public: {
      waNumber: '',
      travelName: ''
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',
  nitro: {
    preset: 'cloudflare-pages'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
