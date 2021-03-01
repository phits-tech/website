import { exec } from 'child_process'
import phin from 'phin'

async function getLocalToken(): Promise<string> {
  const command = 'gcloud auth print-identity-token'
  return await new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, _stderr) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout.replace(/\r?\n|\r/g, ''))
    })
  })
}

async function getOauthToken(receivingServiceUrl: string): Promise<string> {
  const metadataServerUrl = 'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience='
  const url = metadataServerUrl + receivingServiceUrl
  const headers = { 'Metadata-Flavor': 'Google' }
  const response = await phin({ url, headers })
  return response.body.toString()
}

export const getToken = async (serviceUrl: string): Promise<string> => {
  return process.env.FUNCTIONS_EMULATOR ? await getLocalToken() : await getOauthToken(serviceUrl)
}
