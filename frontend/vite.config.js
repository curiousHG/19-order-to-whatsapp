import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Vite requires .jsx extension for JSX by default; this plugin allows .js files to contain JSX
const jsxInJsPlugin = {
  name: 'jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.includes('node_modules') && id.endsWith('.js')) {
      const esbuild = await import('esbuild')
      const result = await esbuild.transform(code, { loader: 'jsx', format: 'esm' })
      return { code: result.code }
    }
  },
}

export default defineConfig({
  plugins: [jsxInJsPlugin, react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'static/frontend'),
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.js'),
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    sourcemap: false,
    manifest: false,
  },
})
