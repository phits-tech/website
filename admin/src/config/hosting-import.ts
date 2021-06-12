import fs from 'fs'
import { keyBy, mapValues } from 'lodash'
import path from 'path'

import { snakeize } from '@phits-tech/common/dist/utils/string-cases'

const VITE_FIREBASE_PREFIX = 'VITE_FIREBASE_'

const main = async (): Promise<void> => {
  const pathToRoot = '../../../'
  const configPath = path.join(__dirname, pathToRoot, 'configs')
  const hostingPath = path.join(__dirname, pathToRoot, 'hosting')

  // Look for Firebase configs
  const configPattern = /^firebase-config\.(\w+)\.json$/g
  fs.readdirSync(configPath).forEach(filename => {
    // Ignore irrelevant files
    const matches = configPattern.exec(filename)
    if (!matches) return

    // Extract "mode" (and ignore emu)
    const mode = matches[1].toLowerCase()
    if (mode === 'emu') return console.info('emu: Ignore (emu is the default configuration from .env)')

    // Read firebase-config
    const firebaseConfig = JSON.parse(fs.readFileSync(path.join(configPath, filename), { encoding: 'utf8' })) as Record<string, string>

    // Read hosting .env
    const destinationFile = path.join(hostingPath, `.env.${mode}.local`)
    const existingEnv = fs.existsSync(destinationFile) ? fs.readFileSync(destinationFile, { encoding: 'utf-8' }) : ''

    // Merge - existing values
    const envPairs = existingEnv
      .replace(/\r\n/g, '\n')
      .split('\n')
      .filter(line => line.includes('='))
      .map(line => line.split('='))

    const envObject = mapValues(
      keyBy(envPairs, pair => pair[0]),
      pair => pair[1]
    )

    // Merge - based on mode (ports default to '')
    if (!envObject.VITE_EMU_PORT_AUTH) envObject.VITE_EMU_PORT_AUTH = ''
    if (!envObject.VITE_EMU_PORT_FIRESTORE) envObject.VITE_EMU_PORT_FIRESTORE = ''
    if (!envObject.VITE_EMU_PORT_FUNCTIONS) envObject.VITE_EMU_PORT_FUNCTIONS = ''

    // Merge - firebase-config
    Object.entries(firebaseConfig).forEach(([key, value]) => {
      envObject[VITE_FIREBASE_PREFIX + snakeize(key).toUpperCase()] = value
    })

    // Write new .env
    const updatedEnv = Object.entries(envObject)
      .sort(([k1, _v1], [k2, _v2]) => k1.localeCompare(k2))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n')

    if (updatedEnv === existingEnv) {
      console.info(`${mode}: Already up-to-date`)
    } else {
      fs.writeFileSync(destinationFile, updatedEnv)
      console.info(`${mode}: Updated firebase-config`)
    }
  })
}

main()
  .then(() => process.exit())
  .catch(error => console.error(error))
