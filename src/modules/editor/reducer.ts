import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MENU_ITEMS_ENUM } from '@keen.io/widget-customization';
import { EditorSection, ReducerState } from './types';

const initialState: ReducerState = {
  activeEditorTab: EditorSection.QUERY,
  activeSettingsSection: MENU_ITEMS_ENUM.TITLES,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setActiveEditorTab: (state, { payload }: PayloadAction<EditorSection>) => {
      state.activeEditorTab = payload;
    },
    setActiveSettingsSection: (
      state,
      { payload }: PayloadAction<MENU_ITEMS_ENUM>
    ) => {
      state.activeSettingsSection = payload;
    },
  },
});

export const appReducer = editorSlice.reducer;
