const collections = (state = {
  items: [],
  schema: {}
}, action) => {
  switch (action.type) {
    case 'CLIENT_FETCH_PROJECT_SUCCESS':
      return {
        ...state,
        items: action.payload.events
      }
    case 'CLIENT_FETCH_SCHEMA_SUCCESS':
      return {
        ...state,
        schema: action.payload.properties
      }
    default:
      return state
  }
}

export default collections;
