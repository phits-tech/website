import { toTitleCase } from './titlecase'

test('can title a lower case string', () => {
  expect(toTitleCase('old mac donald had a farm')).toBe('Old Mac Donald Had A Farm')
})

test('can title a string with intermediate upper case letters', () => {
  expect(toTitleCase('old macDonald had a farm')).toBe('Old MacDonald Had A Farm')
})

test('can title a string with upper case words', () => {
  expect(toTitleCase('old mac donald had a FARM')).toBe('Old Mac Donald Had A FARM')
})
