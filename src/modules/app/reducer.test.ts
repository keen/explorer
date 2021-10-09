import { appReducer, initialState } from './reducer';

import { QueriesSortSettings, SettingsModalSource } from './types';
import { appActions } from './index';

test('set query autorun settings', () => {
  const action = appActions.setQueryAutorun({ autorun: false });
  const { autorunQuery } = appReducer(initialState, action);

  expect(autorunQuery).toBeFalsy();
});

test('shows extraction settings modal', () => {
  const action = appActions.showEmailExtractionModal();
  const { extractToEmailModal } = appReducer(initialState, action);

  expect(extractToEmailModal).toMatchInlineSnapshot(`
    Object {
      "visible": true,
    }
  `);
});

test('hide extraction settings modal', () => {
  const action = appActions.hideEmailExtractionModal();
  const { extractToEmailModal } = appReducer(
    { ...initialState, extractToEmailModal: { visible: true } },
    action
  );

  expect(extractToEmailModal).toMatchInlineSnapshot(`
    Object {
      "visible": false,
    }
  `);
});

test('set browser screen dimension', () => {
  const action = appActions.setScreenDimension({ width: 1024, height: 786 });
  const { browserScreen } = appReducer(initialState, action);

  expect(browserScreen).toMatchInlineSnapshot(`
    Object {
      "height": 786,
      "width": 1024,
    }
  `);
});

test('updates visualization', () => {
  const action = appActions.setVisualization({
    type: 'bar',
    chartSettings: { layout: 'vertical' },
    widgetSettings: {},
  });
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

test('restores visualization settings to initial configuration', () => {
  const action = appActions.resetVisualization();
  const { visualization } = appReducer(
    {
      ...initialState,
      visualization: {
        type: 'bar',
        chartSettings: {
          groupMode: 'stacked',
        },
        widgetSettings: {},
      },
    },
    action
  );

  expect(visualization).toEqual(initialState.visualization);
});

test('updates application view', () => {
  const action = appActions.setViewMode({ view: 'browser' });
  const { view } = appReducer(initialState, action);

  expect(view).toEqual('browser');
});

test('updates state for query settings modal', () => {
  const action = appActions.showQuerySettingsModal({
    source: SettingsModalSource.QUERY_SETTINGS,
  });
  const { querySettingsModal } = appReducer(initialState, action);

  expect(querySettingsModal).toEqual({
    visible: true,
    source: SettingsModalSource.QUERY_SETTINGS,
  });
});

test('updates "confirmation" state', () => {
  const meta = { queryName: 'count' };
  const action = appActions.showConfirmation({ confirmAction: 'delete', meta });

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
  const action = appActions.acceptConfirmation();
  const state = appReducer(initialState, action);

  expect(state.confirmModal).toEqual(initialState.confirmModal);
});

test('restores initial state after users dismiss confirmation', () => {
  const action = appActions.hideConfirmation();
  const state = appReducer(initialState, action);

  expect(state.confirmModal).toEqual(initialState.confirmModal);
});

test('update state when EmbedWidgetModal is opened', () => {
  const action = appActions.showEmbedModal();
  const { embedModal } = appReducer(initialState, action);

  expect(embedModal).toEqual({
    visible: true,
  });
});

test('update state when EmbedWidgetModal is closed', () => {
  const action = appActions.hideEmbedModal();
  const { embedModal } = appReducer(initialState, action);

  expect(embedModal).toEqual({
    visible: false,
  });
});

test('update state when chart setttings has been changed', () => {
  const settings = { stepLabels: ['label1'] };
  const action = appActions.updateChartSettings({ chartSettings: settings });

  const {
    visualization: { chartSettings },
  } = appReducer(initialState, action);
  expect(chartSettings).toEqual(settings);
});

test('set filters settings for queries', () => {
  const settings = {
    showOnlyCachedQueries: true,
    tags: ['some-tag'],
  };
  const action = appActions.setQueriesFilters({ filters: settings });

  const { queriesFilters } = appReducer(initialState, action);
  expect(queriesFilters).toEqual(settings);
});

test('set sort settings for queries', () => {
  const settings = {
    direction: 'descending',
    property: 'lastModifiedDate',
  } as QueriesSortSettings;
  const action = appActions.setQueriesSortSettings({ sortSettings: settings });

  const { queriesSortSettings } = appReducer(initialState, action);
  expect(queriesSortSettings).toEqual(settings);
});
