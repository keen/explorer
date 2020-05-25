import { combineReducers } from 'redux';
import collections from './reducers/collections';
import queries from './reducers/queries';
import ui from './reducers/ui';

import { savedQueryReducer } from '../modules/savedQuery';

export default combineReducers({
  savedQuery: savedQueryReducer,
  collections,
  queries,
  ui,
});
