const components = require.context('@/', true, /\.vue$/i)
export default Object.fromEntries(
  components.keys().map(key => [key.match(/\/([^/]*)\./)?.[1] ?? '', components(key).default])
)
