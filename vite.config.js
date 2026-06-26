import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/', // Sets the path to the root of your custom domain
  plugins: [
    react(),
    tailwindcss(), // Brings Tailwind styling back!
  ],
})