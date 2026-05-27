import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    // Allow Vite dev server to read files from the repository root
    // so import.meta.glob('../../public/**/*.html') works from src.
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
  // Add the preview block here to allow Render's URL
  preview: {
    allowedHosts: ['raw-radicle-website.onrender.com']
  }
})