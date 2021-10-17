import { ImgDiffFunc, JsonAnalyzer } from "../jsonAnalyzer";
import { fixture } from "./fixture";

const mockImgDiffFuncCreator =
  // img filename is 0 origin
  (diffIndex: number): ImgDiffFunc =>
  (imgPath1: string, imgPath2: string, diffImagePath?: string) => {
    // testing all data have diff
    if (diffIndex === -1) {
      return Promise.resolve(1);
    }

    if (imgPath2.includes((diffIndex).toString())) {
      return Promise.resolve(1);
    }

    return Promise.resolve(0);
  };

describe("jsonAnalyzer", () => {
  describe("analyzeCompleteRender", () => {
    describe("when multiple snapshots exist", () => {
      describe("when diff is detected in index 1", () => {
        let analyzer: JsonAnalyzer;
        beforeEach(() => {
          analyzer = new JsonAnalyzer(fixture, mockImgDiffFuncCreator(1));
        });
        test("return snapshot json data of index 2", async () => {
          expect(await analyzer.analyzeCompleteRender("a", "b")).toBe(
            fixture.traceEvents[2]
          );
        });
      });
      describe("when all snapshot have diff", () => {
        let analyzer: JsonAnalyzer;
        beforeEach(() => {
          analyzer = new JsonAnalyzer(fixture, mockImgDiffFuncCreator(-1));
        });
        test("return snapshot json data of last index", async () => {
          expect(await analyzer.analyzeCompleteRender("a", "b")).toBe(
            fixture.traceEvents[fixture.traceEvents.length - 1]
          );
        });
      });
    });
  });
});
