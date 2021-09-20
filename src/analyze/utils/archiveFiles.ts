import { format } from "date-fns";
import fs from "fs-extra";
import { TIMESTAMP_FORMAT } from "../../utils/constants";

export async function archiveFiles(targets: string[], archiveDir: string) {
	
  const promises = targets.map(async (target) => {
    if (fs.existsSync(target)){ 
      return fs.move(target, `${archiveDir}/${target}/${format(new Date(), TIMESTAMP_FORMAT)}`);
    }
  })
  return await Promise.all(promises);
}
