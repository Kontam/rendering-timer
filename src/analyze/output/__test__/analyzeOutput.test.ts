import { advanceTo } from "jest-date-mock";
import fs from "fs-extra";
import { format } from "date-fns";
import { TIMESTAMP_FORMAT } from "../../../utils/constants";
import { AnalyzeOutput } from "../analyzeOutput";
import { ScenarioResult } from "../../../types";

const mockFs = {
  writeFileSync: jest.fn(),
};

describe("AnalyzeOutput", () => {
  let analyzer: AnalyzeOutput;
  let data: ScenarioResult[];
  beforeEach(() => {
    advanceTo(); // Mocking Date
    mockFs.writeFileSync.mockClear();
  });
  describe("outputCSV", () => {
    describe("when data was passed", () => {
      beforeEach(async () => {
        data = [{ name: "test", data: [{ duration: 1 }] }];
        analyzer = new AnalyzeOutput(data, mockFs as any as typeof fs);
        await analyzer.createOutputDir();
        await analyzer.outputCsv();
      });
      test("output directory path includes timestamp", () => {
        const ex = expect.stringContaining(
          format(new Date(), TIMESTAMP_FORMAT)
        );
        expect(mockFs.writeFileSync.mock.calls[0][0]).toEqual(ex);
      });
      test("created csv data will be written", () => {
        const ex = expect.stringContaining(
          "test,1,1"
        );
        expect(mockFs.writeFileSync.mock.calls[0][1]).toEqual(ex);
      });
    });
  });
});
