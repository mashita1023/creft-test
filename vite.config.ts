import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4536,
  },
  mode: 'development',
  plugins: [react()],
  // 「デプロイしたら画面が出ない」問題を回避
  base: './',
})
