import { advanceTo } from "jest-date-mock";
import fs from "fs-extra";
import { archiveFiles } from "../archiveFiles";
import { TIMESTAMP_FORMAT } from "../../../utils/constants";
import { format } from "date-fns";

jest.mock("fs-extra");

describe("Archive function", () => {
  beforeEach(() => {
    advanceTo(); // Mocking Date
    (fs.move as jest.Mock).mockClear();
  });
  describe("If target folder is exist.", () => {
    const targets = ["target1", "target2"]
    beforeEach(() => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      archiveFiles(targets, "archive");
    });
    test("fs.move will be called 2 times (length of first argment)", () => {
      expect((fs.move as jest.Mock).mock.calls.length).toBe(targets.length);
    });

    test("archive directory path with current timestamp is passed as second argument", () => {
      const timestamp = format(new Date(), TIMESTAMP_FORMAT);
      expect((fs.move as jest.Mock)).toHaveBeenLastCalledWith(targets[targets.length -1], expect.stringContaining(timestamp));
    });
  });
  describe("If target folder is not exist", () => {
    const targets = ["target1", "target2"]
    beforeEach(() => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      archiveFiles(targets, "archive");
    });
    test("fs.move won't be called", () => {
      expect((fs.move as jest.Mock).mock.calls.length).toBe(0);
    });
  });
});
