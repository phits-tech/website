import main from './migrate'

main()
  .then(() => process.exit())
  .catch((error) => console.error(error))
