import fs from 'fs'
import path from 'path'

import { CONFIG, CONFIG_MIGRATIONS } from '@phits-tech/common/dao-firestore'

import { productionWarning } from '@/_services/modes'
import admin from '~/firebase-admin-initialized'

interface Migration {
  up: (db: admin.firestore.Firestore) => Promise<void>
  // TODO: optional down method to support reversing migrations
  down?: (db: admin.firestore.Firestore) => Promise<void>
}

const db = admin.firestore()
const migrationsRef = db.collection(CONFIG).doc(CONFIG_MIGRATIONS)

async function scanMigrations(): Promise<string[]> {
  return await new Promise((resolve, reject) => {
    fs.readdir(__dirname, function (err, files) {
      if (err) {
        reject(err)
        return
      }
      resolve(files
        .filter(f => /^\d{3}-.*\.ts$/.test(f))
        .map(f => f.replace(/\.ts$/, '')))
    })
  })
}

async function readMigration(name: string): Promise<Migration> {
  const fullPath = path.join(__dirname, `${name}.ts`)
  return await import(fullPath).then((migration) => {
    if ('up' in migration) {
      return migration as Migration
    }
    throw new Error('Badly formed migration')
  })
}

async function getCompletedMigrations(): Promise<string[]> {
  const migrationsSnap = await migrationsRef.get()
  const migrations = migrationsSnap.data() ?? {}
  return Object.keys(migrations).filter(m => migrations[m] === true)
}

const main = async (): Promise<void> => {
  if (!process.argv.includes('--yes')) {
    await productionWarning(__filename)
  }

  // Determine which migrations need to be run
  const foundMigrations = await scanMigrations()
  const completedMigrations = await getCompletedMigrations()
  const neededMigrations = foundMigrations
    .filter(m => !completedMigrations.includes(m))
    .sort((a, b) => a.localeCompare(b))

  if (neededMigrations.length === 0) {
    return console.log('\nMigrations up-to-date already')
  }

  // Run migrations
  for (const migrationName of neededMigrations) {
    // TODO: Wrap this in a try/catch?
    console.log(`Migration: ${migrationName}`)
    const migration = await readMigration(migrationName)
    await migration.up(db)
    await migrationsRef.set({ [migrationName]: true }, { merge: true })
    console.log(`Migration: ${migrationName} ✅`)
  }
  console.log('Complete')
}

export default main
