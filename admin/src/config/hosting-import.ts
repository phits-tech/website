import fs from 'fs'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import path from 'path'

import { snakeize } from '@phits-tech/common/utils/string-cases'

const VUE_FIREBASE_PREFIX = 'VUE_APP_FIREBASE_'

const main = async (): Promise<void> => {
  const pathToRoot = '../../../'
  const source = path.join(__dirname, pathToRoot, 'configs')
  const destination = path.join(__dirname, pathToRoot, 'hosting')

  const filenames = fs.readdirSync(source)
  filenames.forEach((filename) => {
    // Filter relevant files
    const filePattern = /^firebase-config\.(\w+)\.json$/g
    const matches = filePattern.exec(filename)
    if (!matches) return

    // Determine mode
    const mode = matches[1].toLowerCase()
    if (mode === 'emu') {
      console.log('emu: Ignore (emu is the default configuration from .env.local)')
      return
    }
    const destinationFile = path.join(destination, `.env.${mode}.local`)

    // Read firebase-config
    const firebaseConfig = JSON.parse(fs.readFileSync(path.join(source, filename), { encoding: 'utf8' })) as Record<string, string>

    // Read hosting .env
    const vueEnv = fs.existsSync(destinationFile) ? fs.readFileSync(destinationFile, { encoding: 'utf-8' }) : ''
    const lines = vueEnv
      .replace(/\r\n/g, '\n')
      .split('\n')
      .filter((line) => line.includes('='))

    // Merge - existing values
    const merged = mapValues(
      keyBy(lines, (line) => line.slice(0, Math.max(0, line.indexOf('=')))),
      (line) => line.slice(Math.max(0, line.indexOf('=') + 1))
    )

    // Merge - based on mode
    merged.VUE_APP_MODE = mode.toUpperCase()
    if (!merged.VUE_APP_EMU_PORT_AUTH) merged.VUE_APP_EMU_PORT_AUTH = ''
    if (!merged.VUE_APP_EMU_PORT_FIRESTORE) merged.VUE_APP_EMU_PORT_FIRESTORE = ''
    if (!merged.VUE_APP_EMU_PORT_FUNCTIONS) merged.VUE_APP_EMU_PORT_FUNCTIONS = ''

    // Merge - firebase-config
    Object.entries(firebaseConfig).forEach(([key, value]) => {
      merged[VUE_FIREBASE_PREFIX + snakeize(key).toUpperCase()] = value
    })

    // Write new .env
    const newEnv = Object.entries(merged)
      .sort(([k1, _v1], [k2, _v2]) => k1.localeCompare(k2))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n')

    if (newEnv === vueEnv) {
      console.log(`${mode}: Already up-to-date`)
    } else {
      fs.writeFileSync(destinationFile, newEnv)
      console.log(`${mode}: Updated firebase-config`)
    }
  })
}

main()
  .then(() => process.exit())
  .catch((error) => console.error(error))
