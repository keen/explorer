import { download } from './download';

const convertToCSV = (
  data = null,
  columnDelimiter = ',',
  lineDelimiter = '\n'
) => {
  let result: string;
  let ctr: number;

  if (data === null || !data.length) {
    return null;
  }

  const keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach((item: Record<string, any>) => {
    ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) {
        result += columnDelimiter;
      }

      result +=
        typeof item[key] === 'string' && item[key].includes(columnDelimiter)
          ? `"${item[key]}"`
          : item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

export const exportToCsv = (data: Record<string, any>, filename: string) => {
  let downloadFileName = filename;
  const hasExtension = filename.includes('.csv');

  if (!hasExtension) {
    downloadFileName = `${filename}.csv`;
  }

  const csvOutput = convertToCSV(data);
  download(csvOutput, downloadFileName, 'text/csv;encoding:utf-8');
};
