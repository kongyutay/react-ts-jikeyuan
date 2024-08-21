import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
//ts 的话要安装类型声明文件 npm i @types/node -D
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@':path.resolve(__dirname, './src')
    }
  }
})
