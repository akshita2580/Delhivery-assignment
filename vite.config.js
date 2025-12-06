import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['react-dom/client'],
    include: ['three']
  },
  resolve: {
    alias: {
      'react-dom/client': 'react-dom'
    }
  }
})

