import * as download from './download';
import { exportToCsv } from './exportToCsv';

test('exports data to csv', () => {
  const mockDownload = jest
    .spyOn(download, 'download')
    .mockImplementation(jest.fn());
  const data = {
    data: [
      ['timestamp', 'name'],
      ['2021-10-13T19:54:36.075Z', '@name1'],
      ['2020-12-17T08:13:36.075Z', '@name2'],
    ],
    fileName: 'filename',
  };
  exportToCsv(data);
  expect(mockDownload).toBeCalledWith(
    'timestamp,name\n2021-10-13T19:54:36.075Z,@name1\n2020-12-17T08:13:36.075Z,@name2\n',
    'filename.csv',
    'text/csv;encoding:utf-8'
  );
});
