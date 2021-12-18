import { format } from "date-fns";
import path from "path";
import { TIMESTAMP_FORMAT } from "../../../utils/constants";

export async function createOutputDirPath(outputDirName: string) {
  const timestamp = format(new Date(), TIMESTAMP_FORMAT);
  const pathname = path.resolve(outputDirName, timestamp) 
  return pathname;
}
