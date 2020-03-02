import stringify from 'csv-stringify';

import { download } from './download';

export const exportToCsv = (data, filename) => {
  let downloadFileName = filename;
  const hasExtension = filename.includes('.csv');

  if (!hasExtension) {
    downloadFileName = `${filename}.csv`;
  }

  stringify(data, (err, output) => {
    if (err) {
      alert('There was a problem with CSV Export')
      return;
    }
    download(output, downloadFileName, 'text/csv;encoding:utf-8');
  });
}
