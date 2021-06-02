// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/_assets'),
        '~': path.resolve(__dirname, 'src/_services')
      }
    },
    optimization: {
      minimize: !isDev,
      minimizer: isDev
        ? []
        : [
            new TerserPlugin({
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
          ]
    }
  }
}
