// utils/arrayUtils.ts

/**
 * Remove the first item that matches the predicate using findIndex and splice.
 */
export function removeWhere<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  const index = arr.findIndex(predicate);
  if (index !== -1) {
    const copy = [...arr];
    copy.splice(index, 1);
    return copy;
  }
  return arr;
}

/**
 * Group array items by a specific key.
 */
export function groupBy<T, K extends keyof any>(
  arr: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((result, item) => {
    const key = keyFn(item);
    (result[key] ||= []).push(item);
    return result;
  }, {} as Record<K, T[]>);
}

/**
 * Return unique items based on a key function.
 */
export function uniqueBy<T, K>(arr: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Split an array into chunks of given size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Sort array by key function (ascending).
 */
export function sortBy<T, K extends string | number>(
  arr: T[],
  keyFn: (item: T) => K
): T[] {
  return [...arr].sort((a, b) => {
    const keyA = keyFn(a);
    const keyB = keyFn(b);
    return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
  });
}

/**
 * Move an item in array from one index to another.
 */
export function moveItem<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const copy = [...arr];
  const item = copy.splice(fromIndex, 1)[0];
  copy.splice(toIndex, 0, item);
  return copy;
}

/**
 * Insert item into array at a specific index.
 */
export function insertAt<T>(arr: T[], index: number, item: T): T[] {
  const copy = [...arr];
  copy.splice(index, 0, item);
  return copy;
}

/**
 * Update the first item that matches the predicate with a modifier function.
 */
export function updateWhere<T>(
  arr: T[],
  predicate: (item: T) => boolean,
  updater: (item: T) => T
): T[] {
  const index = arr.findIndex(predicate);
  if (index !== -1) {
    const copy = [...arr];
    copy[index] = updater(copy[index]);
    return copy;
  }
  return arr;
}
