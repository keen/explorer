import { download } from './download';
import { parseQuery, convertToCSV } from '@keen.io/parser';

const FILENAME = 'chart';

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
  const csvOutput = convertToCSV({ data: parsedQuery.results });
  download(csvOutput, downloadFileName, 'text/csv;encoding:utf-8');
};
