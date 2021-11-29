import { editorSagaActions } from './actions';
import { editorSaga } from './saga';
import { editorSlice } from './reducer';

const editorReducer = editorSlice.reducer;
const editorActions = {
  ...editorSlice.actions,
  ...editorSagaActions,
};
export * from './types';

export { editorSaga, editorActions, editorReducer };
