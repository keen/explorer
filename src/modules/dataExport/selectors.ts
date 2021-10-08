import { AppState } from '../types';

export const getExportToCSVModalVisibility = ({ dataExport }: AppState) => {
  return dataExport.exportCSVModalVisible;
};
