import { AppState } from '../types';

export const getExportToCSVModalVisibility = ({ dataExport }: AppState) => {
  return dataExport.exportCSVModalVisible;
};

export const getActiveEditorTab = ({ editor }: AppState) => {
  return editor.activeEditorTab;
};

export const getActiveSettingsSection = ({ editor }: AppState) => {
  return editor.activeSettingsSection;
};
