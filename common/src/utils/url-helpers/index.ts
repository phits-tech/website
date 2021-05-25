export const urlify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\da-z-]/g, '') // remove non-latin
    .replace(/-+/g, '-') // merge consecutive dashes
}
