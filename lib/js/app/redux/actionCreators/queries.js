export const updateSavedQueries = (result) => ({
  type: 'UPDATE_SAVED_QUERIES',
  payload: result,
});

export const resetResults = () => ({
  type: 'QUERY_RESET_RESULTS',
});
