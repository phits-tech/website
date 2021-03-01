// phin type definitions are missing for "defaults(...)"
// See https://github.com/ethanent/phin/issues/57
import phin from 'phin'

// @ts-expect-error: `defaults` is missing from type def
export const post: <T>(req: unknown) => Promise<{ body: T }> = phin.defaults({
  method: 'POST',
  parse: 'json',
  timeout: 5000
})

// @ts-expect-error
export const get: <T>(req: unknown) => Promise<{ body: T }> = phin.defaults({ parse: 'json', timeout: 5000 })
