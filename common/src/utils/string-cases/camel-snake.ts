// TODO: Maybe fix the types... probably not
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @param {Object|String} data string or keys of object are named in form of snake
 * @param {number} depth to which level of keys should it process
 * @return {Object|String} string or keys of object are named in form of camel case
 */
export const snakeToCamel = function (data: any, depth?: number): any {
  if (isObject(data)) {
    if (typeof depth === 'undefined') {
      depth = 1
    }
    return processKeys(data, camelize, depth)
  } else {
    return camelize(data)
  }
}

/**
 * @param {Object|String} data string or keys of object are named in form of camel case
 * @param {number} depth to which level of keys should it process
 * @return {Object|String} string or keys of object are named in form of snake
 */
export const camelToSnake = function (data: any, depth?: number): any {
  if (isObject(data)) {
    if (typeof depth === 'undefined') {
      depth = 1
    }
    return processKeys(data, snakeize, depth)
  } else {
    return snakeize(data)
  }
}

// snakelize a string formed in underscore
export function snakeize(key: string): string {
  const separator = '_'
  const split = /(?=[A-Z])/

  return key.split(split).join(separator).toLowerCase()
}

// camelize a string formed in underscore
export function camelize(key: string | number): string | number {
  if (typeof key === 'number') {
    return key
  }
  key = key.replace(/[\s_-]+(.)?/g, function (_match, ch: string) {
    return ch ? ch.toUpperCase() : ''
  })
  // Ensure 1st char is always lowercase
  return key.slice(0, 1).toLowerCase() + key.slice(1)
}

// camelize/snakelize keys of an object
// @param {number} depth to which level of keys should it process
function processKeys(obj: any, processer: any, depth: number): any {
  if (depth === 0 || !isObject(obj)) {
    return obj
  }

  const result: any = {}
  const keys = Object.keys(obj)

  for (const key of keys) {
    result[processer(key)] = processKeys(obj[key], processer, depth - 1)
  }

  return result
}

function isObject(x: any): boolean {
  return (typeof x === 'object' || typeof x === 'function') && x !== null
}
