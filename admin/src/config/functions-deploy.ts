// TODO: Add productionWarning & migrate to standard mode arg
import cp from 'child_process'
import fs from 'fs'
import path from 'path'

import { camelToSnake } from '@phits-tech/common/dist/utils/string-cases'

const projectAlias = process.argv[2]
if (!projectAlias) {
  console.log('USAGE: yarn config:deploy PROJECT_ALIAS')
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
  console.log('Copied emu config to functions/.runtimeconfig.json')
  process.exit(0)
}

const configString = fs.readFileSync(configPath, { encoding: 'utf8' })

// TODO: Make this a pure function
const collectConfigLines = (o: Record<string, unknown>, propPath: string, configLines: string[]): void => {
  propPath = propPath || ''
  for (const key of Object.keys(o)) {
    const newPropPath = propPath + key
    if (typeof o[key] === 'object') {
      collectConfigLines(o[key] as Record<string, unknown>, newPropPath + '.', configLines)
    } else if (o[key] != null && o[key] !== '') {
      configLines.push(`${newPropPath}=${JSON.stringify(o[key])}`)
    }
  }
}

// Convert to snake and then put in Firebase CLI format
const configSnaked = camelToSnake(JSON.parse(configString), 3)
const configLines: string[] = []
collectConfigLines(configSnaked, '', configLines) // TODO: Is this by reference? Why not return?
const configKeyValuePairs = configLines.join(' ')

console.log(`Deploying config to ${projectAlias}: ${configKeyValuePairs}`)
cp.execSync(`firebase -P ${projectAlias} functions:config:set ${configKeyValuePairs}`)
