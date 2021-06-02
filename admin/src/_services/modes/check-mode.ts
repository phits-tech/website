import admin from '~/firebase-admin-initialized'

import { productionWarning } from '.'

const main = async (): Promise<void> => {
  await productionWarning(__filename)
  console.info(`firebase-admin: v${admin.SDK_VERSION}`)
}

main()
  .then(() => process.exit())
  .catch(error => console.error(error))
