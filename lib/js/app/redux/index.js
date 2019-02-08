import { combineReducers } from 'redux'
import collections from './reducers/collections';
import queries from './reducers/queries';
import ui from './reducers/ui';

export default combineReducers({
  collections,
  queries,
  ui
})
