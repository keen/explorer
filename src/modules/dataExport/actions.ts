import { createAction } from '@reduxjs/toolkit';

export const exportChartToImage = createAction(
  'dataExport/exportChartToImage',
  (quality?: number, backgroundColor?: string) => ({
    payload: {
      quality,
      backgroundColor,
    },
  })
);

export const exportChartToJSON = createAction('dataExport/exportChartToJson');
export const exportDataToCSV = createAction('dataExport/exportDataToCSV');
