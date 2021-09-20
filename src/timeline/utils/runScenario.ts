import puppeteer from "puppeteer";
import path from "path";
import { Scenario } from "../../classes/Scenario";

const width = 1280;
const height = 900;

export async function runScenario(sc: string, lap: number, names: string[]) {
  const module = await import(path.resolve(__dirname, `../../../${sc}`));
  const scenario: Scenario = module.default;
  if (names.length > 0 && !names.includes(scenario.name)) {
    return;
  }

  const browser = await puppeteer.launch({
    headless: false,
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await scenario.run(page, lap);
  } catch (e) {
    console.error(e);
  } finally {
    browser.close();
  }
}
