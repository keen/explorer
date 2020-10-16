import { initialState as queryInitialState } from './modules/query';
import { initialState as eventsInitialState } from './modules/events';
import { initialState as chartSettingsInitialState } from './modules/chartSettings';

export const rehydrateState = () => {
  const schemas =
    window.__QUERY_CREATOR_SCHEMAS__ || eventsInitialState.schemas;

  return {
    query: queryInitialState,
    events: {
      ...eventsInitialState,
      schemas,
    },
    chartSettings: chartSettingsInitialState,
  };
};
