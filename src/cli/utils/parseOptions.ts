import arg from 'arg';


export type TimelineOptions = {
  names: string[];
  times: number;
}

export function parseOptions<T extends arg.Spec>(optionTypes: T) {
  const args = arg(optionTypes);
  return args;
}
