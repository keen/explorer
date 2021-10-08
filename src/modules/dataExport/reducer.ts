import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerState } from './types';

export const initialState: ReducerState = {
  exportCSVModalVisible: false,
};

export const dataExportSlice = createSlice({
  name: 'dataExport',
  initialState,
  reducers: {
    showCSVExportModal: (state, { payload }: PayloadAction<boolean>) => {
      state.exportCSVModalVisible = payload;
    },
  },
});
