import { download } from './download';
import { parseQuery } from '@keen.io/parser';

const FILENAME = 'chart';

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

export const exportToCsv = ({
  data,
  fileName = FILENAME,
}: {
  data: Record<string, any>;
  fileName: string;
}) => {
  let downloadFileName = fileName;
  const hasExtension = fileName.includes('.csv');

  if (!hasExtension) {
    downloadFileName = `${fileName}.csv`;
  }

  const { result, steps } = data;
  const parsedQuery = parseQuery({ result, steps });
  const csvOutput = convertToCSV(parsedQuery.results);
  download(csvOutput, downloadFileName, 'text/csv;encoding:utf-8');
};
