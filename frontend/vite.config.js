import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 4173, // hoặc cổng khác nếu cần
    host: true, // để lắng nghe trên tất cả các IP
  },
})
