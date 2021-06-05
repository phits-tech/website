import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import windicss from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

// const isDev = import.meta.env.NODE_ENV === 'development'
// const isProd = import.meta.env.PROD

export default defineConfig({
  plugins: [vue(), tsconfigPaths(), windicss()],
  server: {
    port: 8080,
    open: true
  },
  // resolve: {
  //   alias: [
  //     { find: '~', replacement: path.resolve(__dirname, 'src/_services') },
  //     { find: '@', replacement: path.resolve(__dirname, 'src') }
  //   ]
  // },
  optimizeDeps: {
    include: ['lodash']
  }
})

// URGENT: Restore this
// const TerserPlugin = require('terser-webpack-plugin')

// module.exports = {
//   configureWebpack: {
//     optimization: {
//       minimize: !isDev,
//       minimizer: isDev
//         ? []
//         : [
//             new TerserPlugin({
//               terserOptions: {
//                 compress: {
//                   drop_console: true,
//                   drop_debugger: true
//                 },
//                 output: {
//                   comments: false
//                 }
//               }
//             })
//           ]
//     }
//   }
// }
