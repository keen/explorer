import { download } from './download';
import { parseQuery } from '@keen.io/parser';
import { exportToCSV } from '@keen.io/data-export';

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

  const { result, query, steps } = data;
  const parsedQuery = parseQuery({ result, query, steps });
  const csvOutput = exportToCSV({ data: parsedQuery.data });
  download(csvOutput, downloadFileName, 'text/csv;encoding:utf-8');
};
