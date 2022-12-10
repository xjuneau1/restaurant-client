import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    open: true,
    host: true
  },
  define: { 'process.env.BABEL_TYPES_8_BREAKING': 'false' }
})
