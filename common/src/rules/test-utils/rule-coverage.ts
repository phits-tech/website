import fs from 'fs'
import http from 'http'

export async function writeCoverage(projectId: string, coverageFile: string): Promise<void> {
  const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST
  if (!emulatorHost) return

  const coverageUrl = `http://${emulatorHost}/emulator/v1/projects/${projectId}:ruleCoverage.html`
  const fstream = fs.createWriteStream(coverageFile)
  return await new Promise((resolve, reject) => {
    http.get(coverageUrl, (res) => {
      res.pipe(fstream, { end: true })
      res.on('end', () => {
        fstream.close()
        resolve()
      })
      res.on('error', reject)
    })
  })
}
