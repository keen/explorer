import { savedQueryActions, savedQueryReducer, initialState } from './index';

test('updates saved query state', () => {
  const updates = {
    cached: true,
    refreshRate: 140,
  };
  const action = savedQueryActions.updateSavedQuery(updates);
  const updatedQuery = savedQueryReducer(initialState, action);
  expect(updatedQuery).toMatchObject(updates);
});

test('restores initial state', () => {
  const action = savedQueryActions.resetSavedQuery();
  const state = savedQueryReducer(initialState, action);

  expect(state).toEqual(initialState);
});

test('updates connected dashboards loading state', () => {
  const action = savedQueryActions.setConnectedDashboardsLoading(true);
  const state = savedQueryReducer(initialState, action);

  expect(state.isConnectedDashboardsLoading).toEqual(true);
});

test('updates connected dashboards error state', () => {
  const action = savedQueryActions.setConnectedDashboardsError(true);
  const state = savedQueryReducer(initialState, action);

  expect(state.isConnectedDashboardsError).toEqual(true);
});

test('updates connected dashboards error state', () => {
  const dashboards = [
    { title: '@dashboard-1', id: '@id-1' },
    { title: '@dashboard-2', id: '@id-2' },
  ];
  const action = savedQueryActions.updateConnectedDashboards(dashboards);
  const state = savedQueryReducer(initialState, action);

  expect(state.connectedDashboards).toEqual(dashboards);
});

test('resets connected dashboards state', () => {
  const action = savedQueryActions.resetConnectedDashboards();
  const state = savedQueryReducer(initialState, action);

  expect(state.isConnectedDashboardsError).toEqual(false);
  expect(state.isConnectedDashboardsLoading).toEqual(false);
  expect(state.connectedDashboards).toEqual(null);
});
