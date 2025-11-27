import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true, // Permite conexiones desde la red local
    allowedHosts: [
      '.loca.lt', // Permite todos los hosts de localtunnel
      'localhost',
    ],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  publicDir: 'assets',
})

