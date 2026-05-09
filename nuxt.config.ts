// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/sitemap'
  ],

  site: {
    url: 'https://nama-web-travel-kamu.com',
    name: 'Travel Agent Indonesia',
    trailingSlash: true
  },
  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'id' // Sangat penting agar Google tahu target bahasa web travel kamu
      }
    }
  }
})
