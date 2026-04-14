// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Metar Explorer',
      script: [
        {
          innerHTML: `
            (function() {
              const stored = localStorage.getItem('vueuse-color-scheme');
              const mode = stored || 'dark';
              document.documentElement.classList.add(mode === 'light' ? 'light' : 'dark');
            })();
          `,
          type: 'text/javascript',
        },
      ],
      meta: [
        { charset: 'utf8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },

  devServer: {
    port: 6767,
  },

  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@vueuse/nuxt'],
})
