import pluginVue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import pluginWindicss from 'vite-plugin-windicss'
import pluginTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [pluginVue(), pluginTsconfigPaths(), pluginWindicss()],
  server: {
    port: 8080,
    open: true
  },
  optimizeDeps: {
    include: ['lodash']
  },
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true
    },
    output: {
      comments: false
    }
  }
})
