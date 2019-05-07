export const updateUI = (payload) => ({
  type: 'UI_UPDATE',
  payload
});

export const updateSavedQueryUI = (payload) => ({
  type: 'UPDATE_SAVED_QUERY_UI',
  payload
});

export const resetSavedQueryUI = (payload) => ({
  type: 'RESET_SAVED_QUERY_UI',
  payload
});

export const resetUI = () => ({
  type: 'RESET_UI',
});
