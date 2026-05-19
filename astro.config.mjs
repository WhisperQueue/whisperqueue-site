import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import pagefind from 'astro-pagefind'

export default defineConfig({
  site: 'https://whisperqueue.axmdev.app',
  integrations: [pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
})