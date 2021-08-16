import { appReducer, appSlice, initialState } from './reducer';

import { SettingsModalSource } from './types';

// import {
//   setViewMode,
//   setVisualization,
//   resetVisualization,
//   showConfirmation,
//   hideConfirmation,
//   acceptConfirmation,
//   showQuerySettingsModal,
//   setScreenDimension,
//   showEmbedModal,
//   hideEmbedModal,
//   showEmailExtractionModal,
//   hideEmailExtractionModal,
//   setQueryAutorun,
//   updateChartSettings,
// } from './actions';

test('set query autorun settings', () => {
  // const action = setQueryAutorun(false);
  const action = appSlice.actions.setQueryAutorun({ autorun: false });
  const { autorunQuery } = appReducer(initialState, action);

  expect(autorunQuery).toBeFalsy();
});

test('shows extraction settings modal', () => {
  // const action = showEmailExtractionModal();
  const action = appSlice.actions.showEmailExtractionModal();
  const { extractToEmailModal } = appReducer(initialState, action);

  expect(extractToEmailModal).toMatchInlineSnapshot(`
    Object {
      "visible": true,
    }
  `);
});

test('hide extraction settings modal', () => {
  // const action = hideEmailExtractionModal();
  const action = appSlice.actions.hideEmailExtractionModal();
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
  // const action = setScreenDimension(1024, 786);
  const action = appSlice.actions.setScreenDimension({
    width: 1024,
    height: 786,
  });
  const { browserScreen } = appReducer(initialState, action);

  expect(browserScreen).toMatchInlineSnapshot(`
    Object {
      "height": 786,
      "width": 1024,
    }
  `);
});

test('updates visualization', () => {
  // const action = setVisualization('bar', { layout: 'vertical' }, {});
  const action = appSlice.actions.setVisualization({
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
  // const action = resetVisualization();
  const action = appSlice.actions.resetVisualization();
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
  // const action = setViewMode('browser');
  const action = appSlice.actions.setViewMode({ view: 'browser' });
  const { view } = appReducer(initialState, action);

  expect(view).toEqual('browser');
});

test('updates state for query settings modal', () => {
  // const action = showQuerySettingsModal(SettingsModalSource.QUERY_SETTINGS);
  const action = appSlice.actions.showQuerySettingsModal({
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
  // const action = showConfirmation('delete', meta);
  const action = appSlice.actions.showConfirmation({
    confirmAction: 'delete',
    meta,
  });

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
  // const action = acceptConfirmation();
  const action = appSlice.actions.acceptConfirmation();
  const state = appReducer(initialState, action);

  expect(state.confirmModal).toEqual(initialState.confirmModal);
});

test('restores initial state after users dismiss confirmation', () => {
  // const action = hideConfirmation();
  const action = appSlice.actions.hideConfirmation();
  const state = appReducer(initialState, action);

  expect(state.confirmModal).toEqual(initialState.confirmModal);
});

test('update state when EmbedWidgetModal is opened', () => {
  // const action = showEmbedModal();
  const action = appSlice.actions.showEmbedModal();
  const { embedModal } = appReducer(initialState, action);

  expect(embedModal).toEqual({
    visible: true,
  });
});

test('update state when EmbedWidgetModal is closed', () => {
  // const action = hideEmbedModal();
  const action = appSlice.actions.hideEmbedModal();
  const { embedModal } = appReducer(initialState, action);

  expect(embedModal).toEqual({
    visible: false,
  });
});

test('update state when chart setttings has been changed', () => {
  const settings = { stepLabels: ['label1'] };
  // const action = updateChartSettings(settings);
  const action = appSlice.actions.updateChartSettings({
    chartSettings: settings,
  });

  const {
    visualization: { chartSettings },
  } = appReducer(initialState, action);
  expect(chartSettings).toEqual(settings);
});
