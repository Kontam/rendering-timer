import glob from 'glob';

export function getTimelines(dirname: string) {
  const files = glob.sync(`${dirname}/**/*.json`);
  return files;
}
