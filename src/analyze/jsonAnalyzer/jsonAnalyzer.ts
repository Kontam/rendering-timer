import { ClickEvent, SnapShot } from "../../types";
import fs from "fs-extra";
import { imgDiff } from "./functions/jpgImgDiff";
import { syncronize } from "../../utils/syncronize";

export type ImgDiffFunc = (imgPath1: string,
  imgPath2: string,
  diffImagePath?: string) => Promise<number>;

export class JsonAnalyzer {
  perfJson: any;
  snapshots: SnapShot[];
  imgDiffFunc: ImgDiffFunc;

  constructor(perfJson: any, imgDiffFunc: ImgDiffFunc ) {
    this.imgDiffFunc = imgDiffFunc;
    this.perfJson = perfJson;
    this.snapshots = this.perfJson.traceEvents.filter((data: any) => {
      if ('snapshot' in data.args) {
        return data;
      }
    });
  }

  outputSnapshotImage(outDirDist: string) {
    this.snapshots.forEach((data, index) => {
      return fs.outputFileSync(
        `${outDirDist}/${index}.jpeg`,
        data.args.snapshot,
        {encoding: 'base64'}
      );
    })
  }

  async analyzeCompleteRender(outDirDist: string, outDirDiff: string) {
    const finalIndex = this.snapshots.length - 1;
    const final = `${outDirDist}/${finalIndex}.jpeg`;
  
    let firstMismatchedIndex = -1;
    // 最後の１枚と画像ファイルを後ろから順番に比較
    const asyncFuncs = this.snapshots.map((_, index) => async () => {
      const currentIndex = finalIndex - index;
      const result = await this.imgDiffFunc(
        final,
        `${outDirDist}/${currentIndex}.jpeg`,
        `${outDirDiff}/${finalIndex}-${currentIndex}.jpeg`,
      );
      if (result !== 0 && firstMismatchedIndex === -1) {
        firstMismatchedIndex = currentIndex; // 最初に差分が出た画像のインデックス
      }
      return;
    });
  
    await syncronize(asyncFuncs);
    const completeRender = firstMismatchedIndex === -1 
     ? this.snapshots[this.snapshots.length - 1] // 全ての画像で差分が出たら最後のsnapshotと比較
     : this.snapshots[firstMismatchedIndex + 1];
    
    return completeRender;
  }

  getClickEvents() {
    const clickEvents: ClickEvent[] = this.perfJson.traceEvents.filter((data: any) => {
      if (data?.name === 'EventDispatch' && data?.args?.data?.type === 'click') {
        return data;
      }
    });
    return clickEvents
  }
}

export function createJsonAnalyzer(perfJson: any) {
  return new JsonAnalyzer(perfJson, imgDiff);
}
