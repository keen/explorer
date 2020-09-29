import { appReducer, initialState } from './reducer';

import { SettingsModalSource } from './types';

import {
  setViewMode,
  setVisualization,
  showConfirmation,
  hideConfirmation,
  acceptConfirmation,
  showQuerySettingsModal,
  setScreenDimension,
} from './actions';

test('set browser screen dimension', () => {
  const action = setScreenDimension(1024, 786);
  const { browserScreen } = appReducer(initialState, action);

  expect(browserScreen).toMatchInlineSnapshot(`
    Object {
      "height": 786,
      "width": 1024,
    }
  `);
});

test('updates visualization', () => {
  const action = setVisualization('bar', { layout: 'vertical' }, {});
  const { visualization } = appReducer(initialState, action);

  expect(visualization).toMatchInlineSnapshot(`
    Object {
      "chartSettings": Object {
        "layout": "vertical",
      },
      "type": "bar",
      "widgetSettings": Object {},
    }
  `);
});

test('updates application view', () => {
  const action = setViewMode('browser');
  const { view } = appReducer(initialState, action);

  expect(view).toEqual('browser');
});

test('updates state for query settings modal', () => {
  const action = showQuerySettingsModal(SettingsModalSource.QUERY_SETTINGS);
  const { querySettingsModal } = appReducer(initialState, action);

  expect(querySettingsModal).toEqual({
    visible: true,
    source: SettingsModalSource.QUERY_SETTINGS,
  });
});

test('updates "confirmation" state', () => {
  const meta = { queryName: 'count' };
  const action = showConfirmation('delete', meta);

  const { confirmModal } = appReducer(initialState, action);

  expect(confirmModal).toMatchInlineSnapshot(`
    Object {
      "action": "delete",
      "meta": Object {
        "queryName": "count",
      },
      "visible": true,
    }
  `);
});

test('restores initial state after users accept confirmation', () => {
  const action = acceptConfirmation();
  const state = appReducer(initialState, action);

  expect(state.confirmModal).toEqual(initialState.confirmModal);
});

test('restores initial state after users dismiss confirmation', () => {
  const action = hideConfirmation();
  const state = appReducer(initialState, action);

  expect(state.confirmModal).toEqual(initialState.confirmModal);
});
