import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/increment': {
        target: 'http://61.157.122.187:48096',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/increment/, ''),
      },
    },
  },
})
