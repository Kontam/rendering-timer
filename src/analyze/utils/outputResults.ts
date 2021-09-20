import Table from 'cli-table3';
import {ScenarioResult} from '../../types';

export function outputResuts(results: ScenarioResult[]) {
  const lengths = results.map(result => result.data.length);
  const longest = lengths.sort((a, b) => b - a)[0];

  // Header
  const tableHead = ['Name'];
  for (let i = 0; i < longest; i++) {
    tableHead.push((i + 1).toString());
  }
  tableHead.push('Average');

  const table = new Table({
    head: tableHead,
  });

  // Body
  results.forEach(result => {
    let sum = 0;
    table.push([
      result.name,
      ...result.data.map(d => {
        sum+=d.duration;
        return `${d.duration}[ms]`;
      }),
      `${Math.floor((sum/result.data.length)*1000)/1000}[ms]`
    ]);
  });

  console.log(table.toString());
}
