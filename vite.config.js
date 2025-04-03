import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default {
  // ...other config
  build: {
    outDir: 'build',
    sourcemap: false
  },
  plugins: [react()],
}
