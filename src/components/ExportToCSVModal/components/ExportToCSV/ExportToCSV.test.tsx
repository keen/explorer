/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import ExportToCSV from './ExportToCSV';

const render = (storeState: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    savedQuery: {
      name: '',
      displayName: '',
      cached: false,
      refreshRate: 0,
      exists: false,
      tags: [],
    },
    app: {
      visualization: {
        type: 'table',
        chartSettings: {},
        widgetSettings: {},
      },
    },
    queries: {
      results: {
        query: {
          analysis_type: 'extraction',
          timeframe: 'last_14_days',
          timezone: 'Etc/UTC',
        },
        result: [],
      },
    },
    ...storeState,
  };

  const store = mockStore({ ...state });

  const wrapper = rtlRender(
    <Provider store={store}>
      <ExportToCSV />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('renders message about empty analysis results', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(getByText('export_csv.empty_data')).toBeInTheDocument();
});

test('renders message about "JSON" visualization limitations', () => {
  const storeState = {
    app: {
      visualization: {
        type: 'json',
        chartSettings: {},
        widgetSettings: {},
      },
    },
    queries: {
      results: {
        query: {
          analysis_type: 'extraction',
          timeframe: 'last_14_days',
          timezone: 'Etc/UTC',
        },
        result: [
          {
            country: 'Poland',
          },
        ],
      },
    },
  };

  const {
    wrapper: { getByText },
  } = render(storeState);

  expect(
    getByText('export_csv.visualization_data_not_available_for_json')
  ).toBeInTheDocument();
});

test('allows user to change export type to "raw data"', () => {
  const storeState = {
    app: {
      visualization: {
        type: 'json',
        chartSettings: {},
        widgetSettings: {},
      },
    },
    queries: {
      results: {
        query: {
          analysis_type: 'extraction',
          timeframe: 'last_14_days',
          timezone: 'Etc/UTC',
        },
        result: [
          {
            country: 'Poland',
          },
        ],
      },
    },
  };

  const {
    wrapper: { getByText },
  } = render(storeState);

  const rawDataTab = getByText('export_csv.raw_data_tab');
  fireEvent.click(rawDataTab);

  expect(getByText('country')).toBeInTheDocument();
  expect(getByText('Poland')).toBeInTheDocument();
});
