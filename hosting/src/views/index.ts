// Get all .vue files
const components = require.context('@/', true, /\.vue$/i)

// Export as { filename: component }
export default Object.fromEntries(
  components.keys().map(key => [
    key.match(/\/([^/]*)\./)?.[1] ?? '', // filename (without path & ext)
    components(key).default // component (must be export default)
  ])
)
