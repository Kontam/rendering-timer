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
    const example = `import { Scenario } from 'rendering-timer';
import { Page } from 'puppeteer';

export default new Scenario({
  name: 'exampleScenario',
  outDir: 'example/moreInfo',
  startUrl: 'https://example.com/',
  triger: async (page: Page) => {
    const link = await page.$('a');
    if(!link) return console.error('link was not found')
    await link.click();
  } 
})
`;

    fs.writeFileSync(`${getProjectRootPath(__dirname)}/scenario/example.ts`, example);

    console.log("scenario/example.ts was created.")
  },
};
