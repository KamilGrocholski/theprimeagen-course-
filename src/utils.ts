export function swap(array: any[], indexA: number, indexB: number) {
  const temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
}

export type Comparison = typeof COMPARISON[keyof typeof COMPARISON];
export type CompareFn<T> = typeof defaultCompareFn<T>;

export const COMPARISON = {
  BIGGER: 1,
  EQUAL: 0,
  SMALLER: -1,
} as const;

export function defaultCompareFn<T>(a: T, b: T): Comparison {
  if (a > b) return COMPARISON.BIGGER;
  if (a < b) return COMPARISON.SMALLER;
  return COMPARISON.EQUAL;
}
