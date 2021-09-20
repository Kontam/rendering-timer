import { ConfigType } from "../types";

export const CONSOLE_INDENT = "    ";
export const TIMESTAMP_FORMAT = "yyyyMMdd-HH:mm:ss";
export const TIMELINE_DIR = "timeline";
export const OUT_DIR_DIST = "dist";
export const OUT_DIR_DIFF = "diff";
export const ARCHIVE_DIR = "archive";
export const SCENARIO_DIR = "scenario";
export const OUTPUT_DIR = "output";
export const CONFIG_PATH = "rtimer.config.json";
export const CONFIG_PROPERTIES: ConfigType = { output: "string", times: "number" };
