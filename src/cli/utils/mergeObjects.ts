export function mergeObjects<T extends Array<Record<string, any>>>(
  objects: T
) {
  let obj: Record<keyof T[number], any> = {} as Record<keyof T[number], any>;
  objects.forEach((o) => {
    obj = Object.assign(obj, o) as Record<keyof T[number], any>;
  });
  return obj;
}
