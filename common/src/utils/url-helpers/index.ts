export const urlify = (text: string): string => {
  return text
    .toLowerCase()
    .replaceAll(' ', '-')
    .replace(/[^\da-z-]/g, '') // remove non-latin
    .replace(/-+/g, '-') // merge consecutive dashes
}
