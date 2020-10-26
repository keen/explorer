import { combineReducers } from 'redux';

import { queryReducer } from './modules/query';
import { eventsReducer } from './modules/events';
import { chartSettingsReducer } from './modules/chartSettings';

export default combineReducers({
  query: queryReducer,
  events: eventsReducer,
  chartSettings: chartSettingsReducer,
});
