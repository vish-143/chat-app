import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@container': path.resolve(__dirname, 'src/container'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils':path.resolve(__dirname, 'src/utils'),
      '@redux':path.resolve(__dirname, 'src/redux'),
      '@actionTypes':path.resolve(__dirname, 'src/redux/actionTypes'),
      '@actions':path.resolve(__dirname, 'src/redux/actions'),
      '@hooks':path.resolve(__dirname, 'src/hooks'),
    },
  },
})



