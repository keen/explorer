const defaultState = {
  items: [],
  schemas: {},
  fetchingSchema: false,
};

const collections = (state = {
  ...defaultState,
}, action) => {
  switch (action.type) {
    case 'CLIENT_FETCH_PROJECT_SUCCESS':
      return {
        ...state,
        items: action.payload.events,
      };
    case 'CLIENT_FETCH_SCHEMA':
      return {
        ...state,
        fetchingSchema: true,
      };
    case 'CLIENT_FETCH_SCHEMA_SUCCESS':
      return {
        ...state,
        schemas: {
          ...state.schemas,
          [action.eventCollection]: {
            ...action.payload.properties,
          },
        },
        fetchingSchema: false,
      };
    case 'CLIENT_FETCH_SCHEMA_ERROR':
      return {
        ...state,
        fetchingSchema: false,
      };
    default:
      return state;
  }
};

export default collections;
