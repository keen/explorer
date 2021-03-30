import { createAction } from '@reduxjs/toolkit';

import { EditorSection } from './types';

export const changeEditorSection = createAction(
  'CHANGE_EDITOR_SECTION',
  (editorSection: EditorSection) => ({
    payload: {
      editorSection,
    },
  })
);

export const setQueryCreatorChartSettings = createAction(
  'SET_QUERY_CREATOR_CHART_SETTINGS',
  (chartSettings: Record<string, any>) => ({
    payload: {
      chartSettings,
    },
  })
);

export const editorSagaActions = {
  changeEditorSection,
  setQueryCreatorChartSettings,
};
