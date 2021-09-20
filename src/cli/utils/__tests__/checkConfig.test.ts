import { CONFIG_PROPERTIES } from "../../../utils/constants";
import { checkConfig } from "../checkConfig";
import { CliConfig } from "../../../types";

describe("checkConfig", () => {
  let mockConfig: any;
  describe("when array is passed", () => {
    beforeEach(() => {
      mockConfig = ["invalid json"];
    });
    test("throw CommonError", () => {
      expect(() => checkConfig(mockConfig, CONFIG_PROPERTIES)).toThrowError(
        /invalid config file/
      );
    });
  });

  describe("when primitive value is passed", () => {
    beforeEach(() => {
      mockConfig = 1;
    });
    test("throw CommonError", () => {
      expect(() => checkConfig(mockConfig, CONFIG_PROPERTIES)).toThrowError(
        /invalid config file/
      );
    });
  });

  describe("when unknown property is included", () => {
    beforeEach(() => {
      mockConfig = {
        times: 1,
        xxxxxx: true,
      };
    });
    test("throw invalid property error", () => {
      expect(() => checkConfig(mockConfig, CONFIG_PROPERTIES)).toThrowError(
        /property/
      );
    });

    test("error message includes property name", () => {
      expect(() => checkConfig(mockConfig, CONFIG_PROPERTIES)).toThrowError(
        /xxxxxx/
      );
    });
  });

  describe("when property value is invalid", () => {
    beforeEach(() => {
      mockConfig = {
        times: "invalid",
        output: "csv",
      };
    });
    test("throw invalid value error", () => {
      expect(() => checkConfig(mockConfig, CONFIG_PROPERTIES)).toThrowError(
        /value/
      );
    });

    test("error message includes property name", () => {
      expect(() => checkConfig(mockConfig, CONFIG_PROPERTIES)).toThrowError(
        /times/
      );
    });
  });

  describe("when valid config is passed", () => {
    let validConfig: CliConfig;
    beforeEach(() => {
      validConfig = {
        output: "csv",
        times: 2,
      };
    });
    test("return true", () => {
      expect(checkConfig(validConfig, CONFIG_PROPERTIES)).toBe(true);
    });
  });
});
