const defaultState = {
  chartType: undefined,
  error: null,
  fetching: false,
  stepLabels: [''],
  loadHeavySchemas: false,
};

const queries = (state = defaultState, action) => {
  switch (action.type) {
    case 'CACHE_QUERY_LIMIT_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default queries;
