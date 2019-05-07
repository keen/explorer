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

    case 'UPDATE_SAVED_QUERIES':
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
        ...defaultState,
      };

    default:
      return state;
  }
};

export default queries;
