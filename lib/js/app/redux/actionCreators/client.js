export const fetchProject = () => ({
  type: 'CLIENT_FETCH_PROJECT',
});

export const query = payload => ({
  type: 'CLIENT_RUN_QUERY',
  payload,
});

export const fetchSchema = payload => ({
  type: 'CLIENT_FETCH_SCHEMA',
  payload,
});

export const fetchRecentEvents = payload => ({
  type: 'CLIENT_FETCH_RECENT_EVENTS',
  payload,
});

export const saveQuery = payload => ({
  type: 'CLIENT_SAVE_QUERY',
  payload,
});

export const deleteQuery = payload => ({
  type: 'CLIENT_DELETE_QUERY',
  payload,
});

export const fetchSavedQueries = () => ({
  type: 'CLIENT_FETCH_SAVED_QUERIES',
});
