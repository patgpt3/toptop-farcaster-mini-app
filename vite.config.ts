import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          privy: ['@privy-io/react-auth'],
          query: ['@tanstack/react-query'],
          router: ['react-router-dom'],
          ui: ['lucide-react', 'clsx', 'tailwind-merge']
        }
      }
    }
  }
}) 