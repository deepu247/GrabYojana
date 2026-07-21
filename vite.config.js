import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Served from the same Express origin in the single-service setup, so the app lives at the domain root.
  base: '/',
  build: {
    outDir: 'build'
  }
})
