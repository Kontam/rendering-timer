import glob from 'glob';

export function getScenarios(dirname: string) {
  const files = glob.sync(`${dirname}/**/*.+(ts|js)`);
  return files;
}
