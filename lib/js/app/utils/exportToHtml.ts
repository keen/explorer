import { download } from './download';

const FILENAME = 'code-snippet';

export const exportToHtml = ({
  data,
  fileName = FILENAME,
}: {
  data: string;
  fileName: string;
}) => {
  let downloadFileName = fileName;
  const hasExtension = fileName.includes('.html');

  if (!hasExtension) {
    downloadFileName = `${fileName}.html`;
  }

  download(data, downloadFileName, 'text/html;charset:utf-8');
};
