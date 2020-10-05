import stringify from 'csv-stringify';

import { download } from './download';

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
  console.log({ data }, downloadFileName);

  stringify([data], { header: true }, (err, output) => {
    if (err) {
      console.log(err);
    }
    console.log('-----stringify, ', output);
    download(output, downloadFileName, 'text/csv;encoding:utf-8');
  });
};
