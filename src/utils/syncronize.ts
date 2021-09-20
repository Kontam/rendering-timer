
export function syncronize(asyncFuncs: Array<() => Promise<any>>) {
  return asyncFuncs.reduce(async (acc, cur) => {
    await acc;
    return cur();
  }, Promise.resolve());
}
