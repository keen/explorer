import { all } from 'redux-saga/effects';

import { savedQuerySaga } from './modules/savedQuery';
import { queriesSaga } from './modules/queries';
import { appSaga } from './modules/app';
import { projectSaga } from './modules/project';
import { editorSaga } from './modules/editor';
import { dataExportSaga } from './modules/dataExport/dataExportSaga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    queriesSaga(),
    savedQuerySaga(),
    projectSaga(),
    editorSaga(),
    dataExportSaga(),
  ]);
}
