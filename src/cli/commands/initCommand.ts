import fs from "fs-extra";
import { glob } from "glob";
import { Command } from "../../types";
import { getProjectRootPath } from "../../utils/getProjectRootPath";

export const initCommand: Command = {
  name: "init",
  optionTypes: {},
  helpText: "    init    create sample scenarios. ",
  exec: async () => {
    const scenarios = glob.sync("scenario/**/*.{t,j}s");
    if (scenarios.length) {
      console.log("scenario files are already exist.")
      return;
    }

    fs.ensureDir('scenario');
    const example = `const { Scenario } = require('rendering-timer');

module.exports = new Scenario({
  name: 'exampleScenario',
  outDir: 'example/moreInfo',
  startUrl: 'https://example.com/',
  /*
  prepare: async (page) => {
    await page.type('#userIdInput', 'userId');
    await page.type('#passwordInput', 'password');
    await page.$('#loginButton').click();
  }
  */
  triger: async (page) => {
    const link = await page.$('a');
    if(!link) return console.error('link was not found')
    await link.click();
  } 
})
`;

    fs.writeFileSync(`${getProjectRootPath(__dirname)}/scenario/example.js`, example);

    console.log("scenario/example.ts was created.")
  },
};
