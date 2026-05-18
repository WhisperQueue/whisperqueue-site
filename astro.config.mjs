import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://whisperqueue.axmdev.app',
  vite: {
    plugins: [tailwindcss()],
  },
})