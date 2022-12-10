import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), replace({
    'process.env': 'import.meta.env',
  })],
  server: {
    watch: {
      usePolling: true
    },
    open: true,
    host: true
  },

  // define: { 'process.env.BABEL_TYPES_8_BREAKING': 'false' }
})
