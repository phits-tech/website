// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@phits-tech/common": path.resolve(__dirname, '../common/dist'),
        '@assets': path.resolve(__dirname, 'src/_assets'),
        '~': path.resolve(__dirname, 'src/_services')
      }
    }
  }
}
