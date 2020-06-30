import { download } from './download';

export const exportToJson = (data: Object, filename: string) => {
  let downloadFileName = filename;
  const hasExtension = filename.includes('.json');

  if (!hasExtension) {
    downloadFileName = `${filename}.json`;
  }

  try {
    download(JSON.stringify(data), downloadFileName, 'text/json;charset:utf-8');
  } catch (err) {
    alert('There was a problem with JSON export');
  }
};
