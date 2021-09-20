import { getScenarios } from "./utils/getScenarios";
import { syncronize } from "../utils/syncronize";
import fs from "fs-extra";
import { format } from "date-fns";
import {
  SCENARIO_DIR,
  TIMELINE_DIR,
  TIMESTAMP_FORMAT,
  ARCHIVE_DIR,
} from "../utils/constants";
import { runScenario } from "./utils/runScenario";
import arg from "arg";

const TIMELINE_ARCHIVE_DIR = `${ARCHIVE_DIR}/${TIMELINE_DIR}`;

export const runAudit = async (args: arg.Result<any>) => {
  const times = args["--times"] || args.times || 1;
  const names = args["--scenario"] ? [args["--scinario"]] : [];

  if (fs.existsSync(TIMELINE_ARCHIVE_DIR)) {
    fs.ensureDir(TIMELINE_ARCHIVE_DIR);
    await fs.move(
      TIMELINE_DIR,
      `${TIMELINE_ARCHIVE_DIR}/${format(new Date(), TIMESTAMP_FORMAT)}`
    );
  }
  const scenarios: string[] = getScenarios(SCENARIO_DIR);
  const asyncFuncs: Array<() => Promise<void>> = [];
  scenarios.forEach((sc) => {
    for (let i = 0; i < times; i++) {
      asyncFuncs.push(() => {
        return runScenario(sc, i, names);
      });
    }
  });
  await syncronize(asyncFuncs);
};
