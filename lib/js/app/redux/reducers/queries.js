const defaultState = {
  results: null,
  saved: [],
  isSavingQuery: false,
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

    case 'CLIENT_SAVE_QUERY':
      return {
        ...state,
        isSavingQuery: true,
      };

    case 'CLIENT_SAVE_QUERY_SUCCESS':
      return {
        ...state,
        isSavingQuery: false,
      };

    case 'CLIENT_SAVE_QUERY_ERROR':
      return {
        ...state,
        isSavingQuery: false,
      };

    case 'CLIENT_FETCH_SAVED_QUERIES_SUCCESS':
      return {
        ...state,
        saved: action.payload,
      };

    case 'CLIENT_DELETE_QUERY_SUCCESS':
      return {
        ...state,
        saved: state.saved.filter(item => item.query_name !== action.payload.name),
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

    case 'QUERY_RESET_RESULTS':
      return {
        ...state,
        results: defaultState.results,
      };

    default:
      return state;
  }
};

export default queries;
