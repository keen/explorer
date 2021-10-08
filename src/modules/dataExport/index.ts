import { dataExportSlice } from './reducer';
import { getExportToCSVModalVisibility } from './selectors';
import {
  exportChartToImage,
  exportChartToJSON,
  exportDataToCSV,
} from './actions';

const dataExportReducer = dataExportSlice.reducer;

const dataExportActions = {
  ...dataExportSlice.actions,
  exportChartToImage,
  exportChartToJSON,
  exportDataToCSV,
};
const dataExportSelectors = {
  getExportToCSVModalVisibility,
};
export * from './types';
export { dataExportActions, dataExportSelectors, dataExportReducer };
