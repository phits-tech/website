export const consoleError = (err: unknown, prefix?: string): void => {
  if (!(err instanceof Error)) throw err // Rethrow non-Errors
  if (prefix) console.error(`${prefix}: ${err.message}`)
  else console.error(err.message)
}
