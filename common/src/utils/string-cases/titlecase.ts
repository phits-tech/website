export const toTitleCase = (input: string): string => input.replace(/(^|\s|-)\S/g, (t) => t.toUpperCase())
