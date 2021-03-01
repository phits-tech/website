import { config } from '../_services/firebase-functions-initialized'
import { get, post } from '../_services/request-helpers/get-post'

const { clientId, clientSecret, scopes, baseUrl } = config.auth

interface UserIdentity { username: string, email: string, name: string }
interface Token { access_token: string }

export function authorizeUrl(redirectUri: string): string {
  const queryString = `client_id=${clientId}&scope=${scopes}&response_type=code&redirect_uri=${redirectUri}`
  return `${baseUrl}/oauth/authorize?${queryString}`
}

export async function exchangeAuthCodeForToken(authCode: string, redirectUri: string): Promise<{ body: { error: string } | Token }> {
  const url = `${baseUrl}/oauth/token`
  const data = {
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    code: authCode,
    redirect_uri: redirectUri
  }
  return await post({ url, data })
}

export async function getUserIdentity(token: Token): Promise<UserIdentity> {
  const url = `${baseUrl}/api/identity`
  const headers = { Authorization: `Bearer ${token.access_token}` }
  const response = await get<UserIdentity>({ url, headers })
  return response.body
}
