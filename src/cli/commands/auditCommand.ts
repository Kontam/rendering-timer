import { Command } from "../../types";
import { runAudit } from "../../timeline/puppeteer";
import { indent } from "../utils/indent";

export const auditCommand: Command = {
  name: "audit",
  optionTypes: {
    '--scenario': String,
    '--help': Boolean,
    '--times': Number,
  },
  helpText: `${indent(1)}audit    Run scenarios to collect performance timeline. `
  + `\n${indent(3)}'--times'  Number of audits, `
  + `\n${indent(3)}'--scenario' Name of scenario for single audit`
  + `\n`,
  exec: async (args) => {
    await runAudit(args);
  },
};
