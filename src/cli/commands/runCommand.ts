import { Command } from "../../types";
import { runAnalyze } from "../../analyze/analyze";
import { runAudit } from "../../timeline/puppeteer";
import { indent } from "../utils/indent";

export const runCommand: Command = {
  name: "run",
  optionTypes: {
    '--scenario': String,
    '--help': Boolean,
    '--times': Number,
    '--output': String,
  },
  helpText: `${indent(1)}run    Run both commands audit and analyze. `
  + `\n${indent(3)}'--times'  Number of runs, `
  + `\n${indent(3)}'--scenario' Name of scenario for single run`
  + `\n`,
  exec: async (args) => {
    await runAudit(args);
    await runAnalyze(args);
  },
};
