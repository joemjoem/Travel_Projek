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
  app: {
    head: {
      htmlAttrs: {
        lang: 'id' // Sangat penting agar Google tahu target bahasa web travel kamu
      }
    }
  },
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://nama-web-travel-kamu.com',
    name: 'Travel Agent Indonesia',
    trailingSlash: true
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
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

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
