import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ← Bu satırı ekleyin
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})