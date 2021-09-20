import arg from "arg";
import { parseOptions } from "../parseOptions";

jest.mock("arg");
describe("parseOptions", () => {
  let optionTypes: arg.Spec;
  describe("optionTypesが指定された時", () => {
    beforeEach(() => {
      optionTypes = {
        "--scenario": String,
        "--help": Boolean,
        "--times": Number,
      };
      (arg as any as jest.Mock).mockReturnValue({
        "--times": 5
      });
    });
    test("optionTypesのキー", () => {
      expect(parseOptions(optionTypes)).toMatchObject({"--times": 5});
    });
  });
});
