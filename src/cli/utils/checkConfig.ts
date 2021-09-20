import { ConfigType } from "../../types";

export function checkConfig(config: any, configType: ConfigType) {
  const CommonErrorMessage = "invalid config file";
  if (typeof config !== "object") throw new Error(CommonErrorMessage);
  if (Array.isArray(config)) throw new Error(CommonErrorMessage);

  for (const prop in config) {
    if (!Object.prototype.hasOwnProperty.call(configType, prop)) {
      throw new Error(
        `invalid property detected in rendered.config.json: ${prop}`
      );
    }
    // @ts-ignore
    if (typeof config[prop] !== (configType[prop] as any)) {
      throw new Error(`invalid config value: ${prop}`);
    }
  }

  return true;
}
