import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './src/main.tsx',
      output: {
        entryFileNames: '[name].js',
        format: 'umd',
        name: 'AnswerAIChatWidget'
      }
    }
  },
  plugins: [preact({ devtoolsInProd: false, devToolsEnabled: false, prefreshEnabled: false })]
});
