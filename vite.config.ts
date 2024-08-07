/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '#api': path.resolve(__dirname, './src/api/'),
      '#assets': path.resolve(__dirname, './src/assets/'),
      '#components': path.resolve(__dirname, './src/components/'),
      '#db': path.resolve(__dirname, './src/db/'),
      '#hooks': path.resolve(__dirname, './src/hooks/'),
      '#mocks': path.resolve(__dirname, './src/__tests__/mocks/'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup.ts',
  },
});
