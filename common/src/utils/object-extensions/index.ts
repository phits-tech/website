/*
 * Versions of `Object.keys`, `Object.values`, `Object.entries` that accept nullable inputs
 * ...greatly reduces intermediate null-checks, supporting optional chaining
 * See also: https://github.com/tc39/proposal-optional-chaining#semantics
 */

export function keys(obj: { [s: string]: unknown } | null | undefined): string[] {
  return obj ? Object.keys(obj) : []
}

export function values<T>(obj: { [s: string]: T } | ArrayLike<T> | null | undefined): T[] {
  return obj ? Object.values(obj) : []
}

export function entries<T>(obj: { [s: string]: T } | ArrayLike<T> | null | undefined): Array<[string, T]> {
  return obj ? Object.entries(obj) : []
}

export function length<T>(obj: { [s: string]: T } | ArrayLike<T> | null | undefined): number {
  return obj ? Object.keys(obj).length : 0
}

/**
 * Like `values` but also copies the keys into the objects as "id" property
 */
export function valuesWithIds<U>(obj?: { [key: string]: U }): Array<U & { id: string }> {
  return obj ? Object.entries(obj).map(([key, value]) => Object.assign(value, { id: key })) : []
}

/**
 * Like `valuesWithIds`, except it operates on a single tuple, e.g. the result of `find`
 */
export function valueWithId<U>(tuple: [string, U]): U & { id: string }
export function valueWithId<U>(tuple?: [string, U]): (U & { id: string }) | undefined
export function valueWithId<U>(tuple?: [string, U]): (U & { id: string }) | undefined {
  return tuple ? Object.assign(tuple[1], { id: tuple[0] }) : undefined
}
