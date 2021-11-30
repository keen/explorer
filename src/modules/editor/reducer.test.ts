import { initialState } from './reducer';
import { editorActions, editorReducer, EditorSection } from './index';
import { MENU_ITEMS_ENUM } from '@keen.io/widget-customization';

test('set active editor tab', () => {
  const action = editorActions.setActiveEditorTab(EditorSection.SETTINGS);
  const { activeEditorTab } = editorReducer(initialState, action);
  expect(activeEditorTab).toBe(EditorSection.SETTINGS);
});

test('set active settings section', () => {
  const action = editorActions.setActiveSettingsSection(
    MENU_ITEMS_ENUM.CHART_ELEMENTS
  );
  const { activeSettingsSection } = editorReducer(initialState, action);
  expect(activeSettingsSection).toBe(MENU_ITEMS_ENUM.CHART_ELEMENTS);
});
