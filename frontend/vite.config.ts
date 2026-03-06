import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy for local dev: frontend uses /api and /stream (relative URLs).
    // In Docker, Caddy handles routing; this is only for npm run dev.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // /api/maintenance-request → /maintenance-request
      },
      '/stream': 'http://localhost:8000',
    },
  },
})
