import fs from "fs";
import path from "path";

export function getProjectRootPath(currentDir: string): string {
  const files = fs.readdirSync(currentDir);
  if (!files.includes("node_modules")) {
    const parentDir = path.dirname(currentDir);
    return getProjectRootPath(parentDir);
  }
  return currentDir;
}
