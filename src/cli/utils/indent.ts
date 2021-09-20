import { CONSOLE_INDENT } from "../../utils/constants";

export function indent(level: number) {
  let result = ``;
  for(let i=0; i<level; i++) {
    result += CONSOLE_INDENT;
  }
  return result;
}
