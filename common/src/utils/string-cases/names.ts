import { toTitleCase } from './titlecase'

export const fixName = (nameToFix: string): { name: string, nameFirst: string, nameLast: string } => {
  // Fix
  const nameTitle = toTitleCase(nameToFix.toLocaleLowerCase())
  const namePieces = nameTitle.split(' ')

  // Split & merge
  const nameFirst = namePieces.length > 0 ? namePieces[0] : ''
  const nameLast = namePieces.length > 1 ? namePieces[namePieces.length - 1] : ''
  const name = `${nameFirst} ${nameLast}`

  // Return
  return { name, nameFirst, nameLast }
}
