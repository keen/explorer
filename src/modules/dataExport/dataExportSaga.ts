import { takeLatest } from 'redux-saga/effects';
import { exportChartToJSON, exportChartToImage } from './actions';
import {
  exportChartToJson as exportChartToJSONSaga,
  exportChartToImage as exportChartToImageSaga,
} from './saga';

export function* dataExportSaga() {
  yield takeLatest(exportChartToJSON.type, exportChartToJSONSaga);
  yield takeLatest(exportChartToImage.type, exportChartToImageSaga);
}
