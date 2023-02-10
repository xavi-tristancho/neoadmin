export const clone = (items: unknown[]): unknown[] =>
  items.map((item: unknown) => (Array.isArray(item) ? clone(item) : item));