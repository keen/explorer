import { download } from './download';

const FILENAME = 'chart';

export const exportToJson = ({
  data,
  fileName = FILENAME,
}: {
  data: Record<string, any>;
  fileName: string;
}) => {
  let downloadFileName = fileName;
  const hasExtension = fileName.includes('.json');

  if (!hasExtension) {
    downloadFileName = `${fileName}.json`;
  }

  download(JSON.stringify(data), downloadFileName, 'text/json;charset:utf-8');
};
