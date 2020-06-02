import { combineReducers } from 'redux';

import { queryReducer } from './modules/query';
import { eventsReducer } from './modules/events';

export default combineReducers({
  query: queryReducer,
  events: eventsReducer,
});
