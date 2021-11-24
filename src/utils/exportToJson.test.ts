import { exportToJson } from './exportToJson';
import * as download from './download';

test('exports data to json', () => {
  const mockDownload = jest
    .spyOn(download, 'download')
    .mockImplementation(jest.fn());
  const data = {
    data: {
      test: 1,
    },
    fileName: 'filename',
  };
  exportToJson(data);
  expect(mockDownload).toBeCalledWith(
    '{"test":1}',
    'filename.json',
    'text/json;charset:utf-8'
  );
});

test('prevents redundant json extension when already provided', () => {
  const mockDownload = jest
    .spyOn(download, 'download')
    .mockImplementation(jest.fn());
  const data = {
    data: {
      test: 1,
    },
    fileName: 'filename.json',
  };
  exportToJson(data);
  expect(mockDownload).toBeCalledWith(
    '{"test":1}',
    'filename.json',
    'text/json;charset:utf-8'
  );
});
