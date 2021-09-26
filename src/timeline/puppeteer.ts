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
import { getProjectRootPath } from "../utils/getProjectRootPath";

const pjRootPath = getProjectRootPath(__dirname);
const ABSOLUTE_TIMELINE_ARCHIVE_DIR = `${pjRootPath}/${ARCHIVE_DIR}/${TIMELINE_DIR}`;
const ABSOLUTE_TIMELINE_DIR = `${pjRootPath}/${TIMELINE_DIR}`;
const ABSOLUTE_SCENARIO_DIR = `${pjRootPath}/${SCENARIO_DIR}`;

export const runAudit = async (args: arg.Result<any>) => {
  const times = args["--times"] || args.times || 1;
  const names = args["--scenario"] ? [args["--scinario"]] : [];

  if (fs.existsSync(ABSOLUTE_TIMELINE_DIR)) {
    fs.ensureDir(ABSOLUTE_TIMELINE_ARCHIVE_DIR);
    await fs.move(
      ABSOLUTE_TIMELINE_DIR,
      `${ABSOLUTE_TIMELINE_ARCHIVE_DIR}/${format(new Date(), TIMESTAMP_FORMAT)}`
    );
  }
  const scenarios: string[] = getScenarios(ABSOLUTE_SCENARIO_DIR);
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
