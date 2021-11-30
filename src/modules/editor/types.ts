import { MENU_ITEMS_ENUM } from '@keen.io/widget-customization';

export enum EditorSection {
  QUERY = 'query',
  SETTINGS = 'settings',
}

export type ReducerState = {
  activeEditorTab?: EditorSection;
  activeSettingsSection?: MENU_ITEMS_ENUM;
};
