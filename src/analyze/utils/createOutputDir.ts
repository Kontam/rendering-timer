import { format } from "date-fns";
import fs from "fs-extra";
import path from "path";
import { TIMESTAMP_FORMAT } from "../../utils/constants";

export async function createOutputDir(outputDirName: string) {
  const timestamp = format(new Date(), TIMESTAMP_FORMAT);
  const pathname = path.resolve(outputDirName, timestamp) 
  await fs.ensureDir(pathname); 
  return pathname;
}
