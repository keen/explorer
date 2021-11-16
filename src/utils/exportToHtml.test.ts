import * as download from './download';
import { exportToHtml } from './exportToHtml';

test('exports data to html', () => {
  const mockDownload = jest
    .spyOn(download, 'download')
    .mockImplementation(jest.fn());
  const data = {
    data: '<div>Test</div>',
    fileName: 'filename',
  };
  exportToHtml(data);
  expect(mockDownload).toBeCalledWith(
    '<div>Test</div>',
    'filename.html',
    'text/html;charset:utf-8'
  );
});
