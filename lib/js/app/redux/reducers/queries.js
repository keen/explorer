const defaultState = {
  results: null,
  saved: [],
};

const queries = (state = {
  ...defaultState,
}, action) => {
  switch (action.type) {
    case 'CLIENT_RUN_QUERY_SUCCESS':
      return {
        ...state,
        results: action.payload,
      };

    case 'CLIENT_FETCH_SAVED_QUERIES_SUCCESS':
      return {
        ...state,
        saved: action.payload,
      };

    case 'UPDATE_ACTIVE_SAVED_QUERY':
      return {
        ...state,
        activeSavedQuery: action.payload,
      };

    case 'RESET_UI':
      return {
        ...state,
        results: defaultState.results,
      };

    default:
      return state;
  }
};

export default queries;
