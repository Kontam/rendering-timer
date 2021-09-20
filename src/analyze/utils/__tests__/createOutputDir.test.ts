import { advanceTo } from "jest-date-mock";
import fs from "fs-extra";
import { createOutputDir } from "../createOutputDir";
import { format } from "date-fns";
import { TIMESTAMP_FORMAT } from "../../../utils/constants";

jest.mock("fs-extra");
describe("createOutputDir", () => {
  const outDirName = "testOutDir";
  beforeEach(() => {
    advanceTo(); // Mocking Date
    (fs.move as jest.Mock).mockClear();
    createOutputDir(outDirName);
  });
  test("output directory path includes timestamp", () => {
    const ex = expect.stringContaining(format(new Date(), TIMESTAMP_FORMAT))
    expect((fs.ensureDir as jest.Mock)).toBeCalledWith(ex);
  })
})
