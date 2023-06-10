/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
/// <reference types="vite-plugin-svgr/client" />
import path from 'path';

const isDev = process?.env?.Node_ENV?.trim() !== 'development';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    minify: !isDev,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [
    react(),
    svgr({
      exportAsDefault: false,
      include: '**/*.svg',
      exclude: '',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'],
  },
});
