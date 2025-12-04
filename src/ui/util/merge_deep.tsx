export function deepMerge<T extends Dict<any>>(
  original: T,
  toMerge: Partial<T>,
  depth: number = 5000
): T {
  const output: Dict<any> = {};
  const keys = Object.keys(toMerge ?? {}).concat(Object.keys(original ?? {}));

  function isPlainObject(v: any) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }

  for (const key of new Set(keys)) {
    const vOriginal = original?.[key];
    const vToMerge = toMerge?.[key];

    if (isPlainObject(vOriginal) && isPlainObject(vToMerge) && depth > 0) {
      //console.log("DEEP MERGE FOR KEY", key, vOriginal, vToMerge);
      output[key] = deepMerge(
        vOriginal as Dict<any>,
        vToMerge as Dict<any>,
        depth - 1
      );
    } else {
      output[key] = vToMerge !== undefined ? vToMerge : vOriginal;
    }
  }
  return output as T;
}
