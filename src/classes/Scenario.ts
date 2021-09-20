import {Page} from "puppeteer";
import fs from "fs-extra";
import path from "path";

export type ScenarioParams = {
  outDir: string;
  startUrl: string;
  name: string;
  prepare?: (page: Page) => Promise<void> | void;
  triger?: (page: Page) => Promise<void> | void;
}

export class Scenario {
  outDir: string;
  startUrl: string;
  name: string;
  childPrepare: ScenarioParams["prepare"];
  childTriger: ScenarioParams["triger"];

  constructor(params: ScenarioParams) {
    this.outDir = path.resolve(__dirname, "../../timeline", params.outDir);
    this.startUrl = params.startUrl;
    this.name = params.name;
    this.childPrepare = params.prepare;
    this.childTriger = params.triger;
  }

  async prepare(page: Page) {
    fs.ensureDir(this.outDir);
    await page.goto(this.startUrl);
    this.childPrepare && await this.childPrepare(page);
  }

  async triger(page: Page) {
    this.childTriger && await this.childTriger(page); 
  }

  async run(page: Page, lap = 1) {
    await this.prepare(page);
    await page.waitForTimeout(3000);
    await page.tracing.start({path: path.resolve(this.outDir, `${lap.toString()}.json`), screenshots: true});
    await this.triger(page);
    await page.waitForTimeout(3000);
    await page.tracing.stop();
  }
}
