import { takeLatest } from 'redux-saga/effects';
import {
  exportDataToCSV,
  exportChartToJSON,
  exportChartToImage,
} from './actions';
import {
  exportDataToCSV as exportDataToCSVSaga,
  exportChartToJson as exportChartToJSONSaga,
  exportChartToImage as exportChartToImageSaga,
} from './saga';

export function* dataExportSaga() {
  yield takeLatest(exportDataToCSV.type, exportDataToCSVSaga);
  yield takeLatest(exportChartToJSON.type, exportChartToJSONSaga);
  yield takeLatest(exportChartToImage.type, exportChartToImageSaga);
}
