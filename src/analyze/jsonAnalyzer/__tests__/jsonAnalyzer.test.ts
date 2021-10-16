import { ImgDiffFunc, JsonAnalyzer } from "../jsonAnalyzer";
import {fixture} from "./fixture";

const mockImgDiffFunc: ImgDiffFunc = (
  imgPath1: string,
  imgPath2: string,
  diffImagePath?: string
) => {
  if (imgPath1.includes("3")) return Promise.resolve(1);
  return Promise.resolve(0);
};

describe("jsonAnalyzer", () => {
  describe("analyzeCompleteRender", () => {
    describe("when multiple snapshots exist", () => {
      let analyzer: JsonAnalyzer;
      beforeEach(() => {
        analyzer = new JsonAnalyzer(fixture, mockImgDiffFunc);
      });
      test("return snapshot json data of first diff index", async () => {
        expect(await analyzer.analyzeCompleteRender("a", "b")).toBe(fixture.traceEvents[2]);
      });
    });
  });
});
