import path from "path";
import { ScenarioResult } from "../../types";
import { analyzeJson } from "./analyzeJson";

export async function analyzeTimelines(jsons: string[],timelineDir: string, distDir: string, diffDir: string) {
  const results: ScenarioResult[] = [];

  const promises = jsons.map(async jsonPath => {
    const scinarioName = path.dirname(jsonPath).replace(`${timelineDir}/`, '');
    const outDirDist = jsonPath
      .replace(timelineDir, distDir)
      .replace(/\.json$/, '');
    const outDirDiff = jsonPath
      .replace(timelineDir, diffDir)
      .replace(/\.json$/, '');

    const singleData = await analyzeJson(jsonPath, outDirDist, outDirDiff);

    const exists = results.find(result => result.name === scinarioName);
    if (exists) {
      exists.data.push(singleData);
      return;
    }
    results.push({
      name: scinarioName,
      data: [singleData],
    });
  });

  await Promise.all(promises);
  return results;
}
