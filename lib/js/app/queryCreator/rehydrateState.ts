import { initialState as queryInitialState } from './modules/query';
import { initialState as eventsInitialState } from './modules/events';

export const rehydrateState = () => {
  const schemas =
    window.__QUERY_CREATOR_SCHEMAS__ || eventsInitialState.schemas;

  return {
    query: queryInitialState,
    events: {
      ...eventsInitialState,
      schemas,
    },
  };
};
