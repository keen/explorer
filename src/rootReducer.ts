import { appReducer } from './modules/app';
import { savedQueryReducer } from './modules/savedQuery';
import { queriesReducer } from './modules/queries';
import { projectReducer } from './modules/project';
import { schemasReducer } from './modules/schemas';
import { dataExportReducer } from './modules/dataExport';
import { editorReducer } from './modules/editor';

export default {
  app: appReducer,
  queries: queriesReducer,
  savedQuery: savedQueryReducer,
  project: projectReducer,
  schemas: schemasReducer,
  dataExport: dataExportReducer,
  editor: editorReducer,
};
