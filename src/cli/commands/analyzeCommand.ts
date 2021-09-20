import { Command } from "../../types";
import { runAnalyze } from "../../analyze/analyze";
import { indent } from "../utils/indent";

type OutputTypes = "csv" | "json" | "all";

export type AnalyzeOptions = {
  "--output"? : OutputTypes;
  output? : OutputTypes;
}

export const analyzeCommand: Command = {
  name: "analyze",
  optionTypes: {
    "--output": String, 
  },
  helpText: `${indent(1)}analyze    Analyze duration of rendering. Before run this command, you have to run audit command first.`
  + `\n${indent(3)}'--output'  select output file type. 'csv' | 'json', `
  + `\n`,
  exec: async (args) => {
    runAnalyze(args);
  }
};
