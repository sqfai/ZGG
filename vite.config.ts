import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  plugins: [react()],
  esbuild: {
    supported: {
      'top-level-await': true
    },
    logLevel: 'error',
    legalComments: 'none',
    jsx: 'automatic',
    loader: 'jsx',
    banner: {
      js: '"use client";'
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    cors: true,
    strictPort: true,
    middlewareMode: false,
    fs: {
      strict: true
    },
    headers: {
      'Cache-Control': 'max-age=31536000, immutable'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'antd']
        }
      }
    },
    target: 'esnext',
    cssTarget: 'chrome61'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'antd', '@ant-design/icons']
  }
})