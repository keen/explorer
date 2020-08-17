import { combineReducers } from 'redux';

import { appReducer } from './modules/app';
import { savedQueryReducer } from './modules/savedQuery';
import { queriesReducer } from './modules/queries';

export default combineReducers({
  app: appReducer,
  queries: queriesReducer,
  savedQuery: savedQueryReducer,
});
