// TODO: Add productionWarning & migrate to standard mode arg
import cp from 'child_process'
import fs from 'fs'
import path from 'path'

import { camelToSnake } from '@phits-tech/common/dist/utils/string-cases'

const projectAlias = process.argv[2]
if (!projectAlias) {
  console.info('USAGE: yarn config:deploy PROJECT_ALIAS')
  process.exit(1)
}

// Try to find a config mode that match the project alias
const mode = projectAlias
const pathToRoot = '../../../'
const configPath = path.join(__dirname, pathToRoot, `configs/functions.${mode}.json`)

if (mode === 'emu') {
  // Copy example to emu
  if (!fs.existsSync(configPath)) {
    const examplePath = path.join(__dirname, pathToRoot, 'configs/functions.example.json')
    fs.copyFileSync(examplePath, configPath)
  }

  // Copy emu to .runtimeconfig.json
  const destinationPath = path.join(__dirname, pathToRoot, 'functions/.runtimeconfig.json')
  fs.copyFileSync(configPath, destinationPath)
  console.info('Copied emu config to functions/.runtimeconfig.json')
  process.exit(0)
}

const configString = fs.readFileSync(configPath, { encoding: 'utf8' })

// TODO: Make this a pure function (no by reference)
const collectConfigLines = (config: Record<string, unknown>, pathPrefix: string, configLines: string[]): void => {
  pathPrefix = pathPrefix || ''
  for (const key of Object.keys(config)) {
    if (config[key] === undefined) continue

    const path = pathPrefix + key
    if (typeof config[key] === 'object') {
      collectConfigLines(config[key] as Record<string, unknown>, path + '.', configLines)
    } else {
      configLines.push(`${path}=${JSON.stringify(config[key])}`)
    }
  }
}

// Convert to snake and then put in Firebase CLI format
const configSnaked = camelToSnake(JSON.parse(configString), 3)
const configLines: string[] = []
collectConfigLines(configSnaked, '', configLines)
const configKeyValuePairs = configLines.join(' ')

console.info(`Deploying config to ${projectAlias}: ${configKeyValuePairs}`)
cp.execSync(`firebase -P ${projectAlias} functions:config:set ${configKeyValuePairs}`)
