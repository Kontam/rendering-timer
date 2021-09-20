import { getTimelines } from "./utils/getTimelines";
import { archiveFiles } from "./utils/archiveFiles";
import {
  ARCHIVE_DIR,
  OUT_DIR_DIFF,
  OUT_DIR_DIST,
  TIMELINE_DIR,
} from "../utils/constants";
import { analyzeTimelines } from "./utils/analyzeTimelines";
import { AnalyzeOutput } from "./output/analyzeOutput";
import { AnalyzeOptions } from "../cli/commands/analyzeCommand";

export const runAnalyze = async (args: AnalyzeOptions) => {
  const jsons = getTimelines(TIMELINE_DIR);
  archiveFiles([OUT_DIR_DIFF, OUT_DIR_DIST], ARCHIVE_DIR);
  const results = await analyzeTimelines(
    jsons,
    TIMELINE_DIR,
    OUT_DIR_DIST,
    OUT_DIR_DIFF
  );

  const analyzeOutput = new AnalyzeOutput(results);
  analyzeOutput.outputConsole();

  if (!args["--output"] && !args.output) return;
  const outputType = args["--output"] || args.output;
  await analyzeOutput.createOutputDir();
  switch (outputType) {
    case "csv":
      analyzeOutput.outputCsv();
      break;
    case "json":
      analyzeOutput.outputJson();
      break;
    default:
      return;
  }
};
