import { combineReducers } from 'redux';
import collections from './reducers/collections';
import ui from './reducers/ui';

import { appReducer } from '../modules/app';
import { savedQueryReducer } from '../modules/savedQuery';
import { queriesReducer } from '../modules/queries';

export default combineReducers({
  app: appReducer,
  queries: queriesReducer,
  savedQuery: savedQueryReducer,
  collections,
  ui,
});
