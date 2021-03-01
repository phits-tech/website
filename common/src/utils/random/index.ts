// Based on MDN docs:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

/**
 * Random integer between zero (inclusive) & max (exclusive)
 * @param max Exclusive upper bound
 */
export function randomIntBelow(max: number): number {
  const min = 0
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt // The maximum is exclusive and the minimum is inclusive
}

/**
 * Random integer between bounds (both inclusive)
 * @param min Inclusive lower bound
 * @param max Inclusive upper bound
 */
export function randomIntBetween(min: number, max: number): number {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt
}

/**
 * Random boolean (true or false)
 */
export function randomBool(percentTrue = 50): boolean {
  const percentInt = Math.floor(percentTrue)
  return randomIntBetween(1, 100) <= percentInt
}

/**
 * Random element from the passed array
 * @param array The array to pick an element from
 */
export function randomElement<T>(array: T[]): T {
  return array[randomIntBelow(array.length)]
}
