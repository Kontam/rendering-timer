import { ResultData } from "../../types";
import { JsonAnalyzer } from "../analyzer/jsonAnalyzer";

export async function analyzeJson(
  jsonPath: string,
  outDirDist: string,
  outDirDiff: string
): Promise<ResultData> {
  const analyzer = new JsonAnalyzer(jsonPath);
  analyzer.outputSnapshotImage(outDirDist);

  const completeRender = await analyzer.analyzeCompleteRender(
    outDirDist,
    outDirDiff
  );
  const clickEvents = analyzer.getClickEvents();
  const duration = completeRender.ts - clickEvents[0].ts;

  return { duration: duration / 1000 };
}
