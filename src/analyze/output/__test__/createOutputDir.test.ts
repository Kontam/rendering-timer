import { advanceTo } from "jest-date-mock";
import fs from "fs-extra";
import { createOutputDirPath } from "../functions/createOutputDirPath";
import { format } from "date-fns";
import { TIMESTAMP_FORMAT } from "../../../utils/constants";

jest.mock("fs-extra");
describe("createOutputDir", () => {
  const outDirName = "testOutDir";
  beforeEach(() => {
    advanceTo(); // Mocking Date
    (fs.move as jest.Mock).mockClear();
  });
  test("output directory path includes timestamp", async () => {
    const ex = expect.stringContaining(format(new Date(), TIMESTAMP_FORMAT))
    expect(await createOutputDirPath(outDirName)).toEqual(ex);
  })
})
