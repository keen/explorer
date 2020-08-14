import { transformQuery } from '../../queryCreator/utils/transformQuery';

const defaultState = {
  results: null,
  saved: [],
  isSavingQuery: false,
  isLimited: false,
};

const queries = (
  state = {
    ...defaultState,
  },
  action
) => {
  switch (action.type) {
    case 'CLIENT_RUN_QUERY_SUCCESS':
      return {
        ...state,
        results: {
          ...action.payload,
          query: transformQuery(action.payload.query),
        },
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
        results: defaultState.results,
      };

    case 'CLIENT_SAVE_QUERY_ERROR':
      return {
        ...state,
        isSavingQuery: false,
        results: defaultState.results,
      };

    case 'CLIENT_FETCH_SAVED_QUERIES_SUCCESS':
      return {
        ...state,
        saved: action.payload,
      };

    case 'CLIENT_DELETE_QUERY_SUCCESS':
      return {
        ...state,
        saved: state.saved.filter(
          (item) => item.query_name !== action.payload.name
        ),
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

    case 'ABOVE_CACHE_QUERY_LIMIT':
      return {
        ...state,
        isLimited: true,
        isSavingQuery: false,
      };

    case 'BELOW_CACHE_QUERY_LIMIT':
      return {
        ...state,
        isLimited: false,
        isSavingQuery: false,
      };

    default:
      return state;
  }
};

export default queries;
