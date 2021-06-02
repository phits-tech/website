import cp from 'child_process'
import fs from 'fs'
import path from 'path'

type FirebaseProjectAlias = 'production' | 'dev'

const description = process.argv[2]
const projectAlias = process.argv[3] as FirebaseProjectAlias | undefined

if (!projectAlias || !description) {
  console.info('USAGE: yarn backup "SHORT DESCRIPTION" [ALIAS]')
  process.exit(1)
}

// Get the project id from .firebaserc
const pathToRoot = '../../../'
const firebaseRcPath = path.resolve(__dirname, pathToRoot, '.firebaserc')
const projects = JSON.parse(fs.readFileSync(firebaseRcPath, { encoding: 'utf8' })).projects as Partial<Record<FirebaseProjectAlias, string>>

const selectedProject = projects[projectAlias]
if (!selectedProject) {
  console.error(`No project for alias ${projectAlias}`)
  process.exit(1)
}

// To backup other environments, create a new bucket in Firebase Console and add below
const buckets: Record<FirebaseProjectAlias, string> = {
  production: 'phits-tech.appspot.com/backups',
  dev: 'phits-tech-dev.appspot.com/backups'
}

const selectedBucket = buckets[projectAlias]
if (!selectedBucket) {
  console.error(`No backup bucket for ${projectAlias}`)
  process.exit(1)
}

const folder = (new Date()).toISOString().slice(0, 19).replace(/[:T]/g, '-') +
  '-' + description.replace(/[\W_]+/g, '-').toLowerCase()
const storageUrl = `gs://${selectedBucket}/${folder}`
console.info(`Backing up ${selectedProject} to: ${storageUrl}`)
cp.execSync(`gcloud firestore export ${storageUrl} --project ${selectedProject}`)
