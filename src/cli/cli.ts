#!/usr/bin/env node
import { CONFIG_PATH, CONFIG_PROPERTIES } from "../utils/constants";
import { analyzeCommand } from "./commands/analyzeCommand";
import { auditCommand } from "./commands/auditCommand";
import { helpCommand } from "./commands/helpCommand";
import { initCommand } from "./commands/initCommand";
import { runCommand } from "./commands/runCommand";
import { checkConfig } from "./utils/checkConfig";
import { mergeObjects } from "./utils/mergeObjects";
import { parseOptions } from "./utils/parseOptions";
import { readConfig } from "./utils/readConfig";

function main() {
  const commands = [
    auditCommand,
    analyzeCommand,
    helpCommand,
    runCommand,
    initCommand,
  ];
  helpCommand.commands = commands;
  const optionTypes = mergeObjects(commands.map((c) => c.optionTypes));
  const args = parseOptions(optionTypes || {});
  if (!args._ || args.length === 0) process.exit(1);

  const config = readConfig(CONFIG_PATH);
  checkConfig(config, CONFIG_PROPERTIES);

  const executable = commands.find((command) => command.name === args._[0]);

  if (!executable) return helpCommand.exec();

  executable.exec({ ...args, ...config });
}

(() => {
  main();
})();
