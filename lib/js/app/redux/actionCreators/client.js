export const fetchProject = () => ({
  type: 'CLIENT_FETCH_PROJECT'
});

export const query = (payload) => ({
  type: 'CLIENT_RUN_QUERY',
  payload
});

export const fetchSchema = (payload) => ({
  type: 'CLIENT_FETCH_SCHEMA',
  payload
});
