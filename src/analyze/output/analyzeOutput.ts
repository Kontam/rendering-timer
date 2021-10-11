import { ScenarioResult } from "../../types";
import { OUTPUT_DIR } from "../../utils/constants";
import { convertToCSV } from "./functions/convertToCSV";
import { createOutputDirPath } from "./functions/createOutputDirPath";
import fs from "fs-extra";
import { outputResuts } from "./functions/outputResults";

export class AnalyzeOutput {
  data: ScenarioResult[];
  outputDirPath: string;
  csvFileName: string;
  jsonFileName: string;
  fs: typeof fs;
  constructor (data: ScenarioResult[], fileSystem: typeof fs) {
    this.data = data; 
    this.outputDirPath = OUTPUT_DIR;
    this.csvFileName = "result.csv";
    this.jsonFileName = "result.json";
    this.fs = fileSystem;
  }

  async createOutputDir() {
    this.outputDirPath = await createOutputDirPath(OUTPUT_DIR);
    await this.fs.ensureDir(this.outputDirPath); 
  }

  outputConsole() {
    outputResuts(this.data);
  }

  async outputCsv() {
    const csv = await convertToCSV(this.data);
    const filePath = `${this.outputDirPath}/${this.csvFileName}`;
    this.fs.writeFileSync(filePath, csv); 
    console.log(`${filePath}/${this.csvFileName} was created.`)
  }

  async outputJson() {
    const json = this.data;
    const filePath = `${this.outputDirPath}/${this.jsonFileName}`;
    this.fs.writeFileSync(filePath, JSON.stringify(json));
    console.log(`${filePath}/${this.jsonFileName} was created.`)
  }
}

export function createAnalyzeOutput(data: ScenarioResult[]) {
  return new AnalyzeOutput(data, fs);
}
