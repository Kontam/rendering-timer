import fs from "fs-extra";

export function readConfig(configPath: string) {
  const json = fs.readJsonSync(configPath, { throws: false });
  if (!json) return null;

  // TODO: check config format

  return json;
}
