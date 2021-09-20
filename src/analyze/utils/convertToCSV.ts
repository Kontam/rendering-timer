import {ScenarioResult} from '../../types';
import stringify from 'csv-stringify';

export function convertToCSV(results: ScenarioResult[]): Promise<string> {
  const lengths = results.map(result => result.data.length);
  const longest = lengths.sort((a, b) => b - a)[0];
  // Header
  const tableHead = ['Name'];
  for (let i = 0; i < longest; i++) {
    tableHead.push((i + 1).toString());
  }
  tableHead.push('Average');

  // Body
  const bodies = results.map(result => {
    let sum = 0;
    return [
      result.name,
      ...result.data.map(d => {
        sum += d.duration;
        return `${d.duration}`;
      }),
      `${Math.floor((sum / result.data.length) * 1000) / 1000}`,
    ];
  });

  return new Promise(resolve =>
    stringify([[...tableHead], ...bodies], (err, data) => {
      resolve(data);
    }),
  );
}
