import { download } from './download';
import { DataExport } from '@keen.io/data-export';

const FILENAME = 'chart';

export const exportToCsv = ({
  data,
  fileName = FILENAME,
}: {
  data: (string | number)[][];
  fileName?: string;
}) => {
  let downloadFileName = fileName;
  const hasExtension = fileName.includes('.csv');

  if (!hasExtension) {
    downloadFileName = `${fileName}.csv`;
  }

  const csvOutput = DataExport.exportToCSV({ data });
  download(csvOutput, downloadFileName, 'text/csv;encoding:utf-8');
};
