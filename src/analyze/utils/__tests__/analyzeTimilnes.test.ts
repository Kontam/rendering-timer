import { analyzeTimelines } from "../analyzeTimelines";
import { analyzeJson } from "../analyzeJson";

jest.mock("../analyzeJson");

describe("analyzeTimelines(creating output paths, and return analyzed data)", () => {
  let jsons: string[];
  beforeEach(() => {
    (analyzeJson as jest.Mock).mockClear();
  });
  describe("When jsons array contains at least 1 item", () => {
    beforeEach(() => {
      jsons = ["timelines/myPage/data.json", "timelines/yourPage/data.json"];
    });
    test("analyzeJson called 2 times(jsons.length)", async () => {
      analyzeTimelines(jsons, "timeline", "dist", "diff");
      expect((analyzeJson as jest.Mock).mock.calls.length).toBe(2);
    });
    test("distDir is included in second arg for analyzeJson", async () => {
      const distDir = "dist";
      const matcher = expect.stringContaining(distDir);
      analyzeTimelines(jsons, "timeline", distDir, "diff");
      expect((analyzeJson as jest.Mock).mock.calls[0][1]).toEqual(matcher);
    });
    test("diffDir is included in second arg for analyzeJson", async () => {
      const diffDir = "diff";
      const matcher = expect.stringContaining(diffDir);
      analyzeTimelines(jsons, "timeline", "dist", diffDir);
      expect((analyzeJson as jest.Mock).mock.calls[0][2]).toEqual(matcher);
    });
  });
});
