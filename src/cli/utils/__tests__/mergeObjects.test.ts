import { mergeObjects } from "../mergeObjects";

describe("mergeObjects", () => {
  let arg: Array<any> = [];
  describe("When arg is Objects with at least 1 properties", () => {
    beforeEach(() => {
      arg = [{ a: 1, x: 2 }, { b: 2 }, { c: 3 }];
    });
    test("Object that have all properties will be returned", () => {
      expect(mergeObjects(arg)).toStrictEqual({ a: 1, x: 2, b: 2, c: 3 });
    });
  });

  describe("When arg includes empty object", () => {
    beforeEach(() => {
      arg = [{ a: 1, x: 2 }, {}, { c: 3 }];
    });
    
    test("Object that have all properties will be returned", () => {
      expect(mergeObjects(arg)).toStrictEqual({ a: 1, x: 2, c: 3 });
    });
  });
});
