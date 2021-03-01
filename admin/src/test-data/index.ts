import { Dao } from '@phits-tech/common/dist/dao-firestore'

import { context } from '~/context'
import { MODE, productionWarning } from '~/modes'
import migrate from '../migrations/migrate'

const main = async (): Promise<void> => {
  await productionWarning(__filename)
  if (MODE !== 'emu') return console.warn('This script is exclusively for local testing')

  // @ts-expect-error - we will use this later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dao = new Dao(context)

  // Run the migrations
  await migrate()

  // ***** Add test data here *****
}

main()
  .then(() => process.exit())
  .catch((error) => console.error(error))
