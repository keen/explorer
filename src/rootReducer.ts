import { combineReducers } from 'redux';

import { appReducer } from './modules/app';
import { savedQueryReducer } from './modules/savedQuery';
import { queriesReducer } from './modules/queries';
import { projectReducer } from './modules/project';
import { schemasReducer } from './modules/schemas';

export default combineReducers({
  app: appReducer,
  queries: queriesReducer,
  savedQuery: savedQueryReducer,
  project: projectReducer,
  schemas: schemasReducer,
});
