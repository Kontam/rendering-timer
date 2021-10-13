import { advanceTo } from "jest-date-mock";
import fs from "fs-extra";
import { format } from "date-fns";
import { TIMESTAMP_FORMAT } from "../../../utils/constants";
import { AnalyzeOutput } from "../analyzeOutput";
import { ScenarioResult } from "../../../types";

const mockFs = {
  writeFileSync: jest.fn(),
  ensureDir: jest.fn(),
};

describe("AnalyzeOutput", () => {
  let analyzer: AnalyzeOutput;
  let data: ScenarioResult[];
  beforeEach(() => {
    advanceTo(); // Mocking Date
    mockFs.writeFileSync.mockClear();
    mockFs.ensureDir.mockClear();
  });
  describe("output files creation", () => {
    describe("create directory for output", () => {
      beforeEach(async () => {
        data = [{ name: "test", data: [{ duration: 1 }] }];
        analyzer = new AnalyzeOutput(data, mockFs as any as typeof fs);
        await analyzer.createOutputDir();
      });
      test("output directory path includes timestamp", () => {
        const ex = expect.stringContaining(
          format(new Date(), TIMESTAMP_FORMAT)
        );
        expect(mockFs.ensureDir).toBeCalledWith(ex);
      });
    });

    describe("output csv", () => {
      describe("when data was passed", () => {
        beforeEach(async () => {
          data = [{ name: "test", data: [{ duration: 1 }] }];
          analyzer = new AnalyzeOutput(data, mockFs as any as typeof fs);
          await analyzer.createOutputDir();
          await analyzer.outputCsv();
        });
        test("output path includes timestamp", () => {
          const ex = expect.stringContaining(
            format(new Date(), TIMESTAMP_FORMAT)
          );
          expect(mockFs.writeFileSync.mock.calls[0][0]).toEqual(ex);
        });
        test("created csv data will be written to file", () => {
          const ex = expect.stringContaining("test,1,1");
          expect(mockFs.writeFileSync.mock.calls[0][1]).toEqual(ex);
        });
      });
      describe("when 3 time's data was passed", () => {
        beforeEach(async () => {
          data = [
            {
              name: "test",
              data: [{ duration: 1 }, { duration: 2 }, { duration: 3 }],
            },
          ];
          analyzer = new AnalyzeOutput(data, mockFs as any as typeof fs);
          await analyzer.createOutputDir();
          await analyzer.outputCsv();
        });
        test("csv includes 3 data and average", () => {
          const ex = expect.stringContaining("test,1,2,3,2");
          expect(mockFs.writeFileSync.mock.calls[0][1]).toEqual(ex);
        });
      });

      describe("when 2 site's data was passed", () => {
        beforeEach(async () => {
          data = [
            { name: "test", data: [{ duration: 1 }] },
            { name: "test2", data: [{ duration: 2 }] },
          ];
          analyzer = new AnalyzeOutput(data, mockFs as any as typeof fs);
          await analyzer.createOutputDir();
          await analyzer.outputCsv();
        });
        test("csv contains 2 site's data", () => {
          const ex = expect.stringContaining("test,1,1\ntest2,2,2");
          expect(mockFs.writeFileSync.mock.calls[0][1]).toEqual(ex);
        });
      });
    });
    describe("output json", () => {
      describe("when data was passed", () => {
        beforeEach(async () => {
          data = [{ name: "test", data: [{ duration: 1 }] }];
          analyzer = new AnalyzeOutput(data, mockFs as any as typeof fs);
          await analyzer.createOutputDir();
          await analyzer.outputJson();
        });
        test("output path includes timestamp", () => {
          const ex = expect.stringContaining(
            format(new Date(), TIMESTAMP_FORMAT)
          );
          expect(mockFs.writeFileSync.mock.calls[0][0]).toEqual(ex);
        });
        test("created json data will be written to file", () => {
          const ex = expect.stringContaining(JSON.stringify(data));
          expect(mockFs.writeFileSync.mock.calls[0][1]).toEqual(ex);
        });
      });
      describe("when 3 time's data was passed", () => {
        beforeEach(async () => {
          data = [
            {
              name: "test",
              data: [{ duration: 1 }, { duration: 2 }, { duration: 3 }],
            },
          ];
          analyzer = new AnalyzeOutput(data, mockFs as any as typeof fs);
          await analyzer.createOutputDir();
          await analyzer.outputJson();
        });
        test("csv includes 3 data and average", () => {
          const ex = expect.stringContaining(JSON.stringify(data));
          expect(mockFs.writeFileSync.mock.calls[0][1]).toEqual(ex);
        });
      });
      describe("when 2 site's data was passed", () => {
        beforeEach(async () => {
          data = [
            { name: "test", data: [{ duration: 1 }] },
            { name: "test2", data: [{ duration: 2 }] },
          ];
          analyzer = new AnalyzeOutput(data, mockFs as any as typeof fs);
          await analyzer.createOutputDir();
          await analyzer.outputJson();
        });
        test("csv contains 2 site's data", () => {
          const ex = expect.stringContaining(JSON.stringify(data));
          expect(mockFs.writeFileSync.mock.calls[0][1]).toEqual(ex);
        });
      });
    });
  });
});
