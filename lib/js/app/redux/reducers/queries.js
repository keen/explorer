const queries = (state = {
  results: null
}, action) => {
  switch (action.type) {
    case 'CLIENT_RUN_QUERY_SUCCESS':
      return {
        ...state,
        results: action.payload
      }
    default:
      return state
  }
}

export default queries;
