const collections = (state = {
  items: []
}, action) => {
  switch (action.type) {
    case 'PROJECT_FETCH_SUCCESS':
    console.log(action.payload);
      return {
        ...state,
        items: action.payload.events
      }
    default:
      return state
  }
}

export default collections;
