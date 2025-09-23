// biome-ignore lint/suspicious/noExplicitAny: must be any
export function replaceNulls<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null ? '' : value,
    ]),
  ) as T;
}
