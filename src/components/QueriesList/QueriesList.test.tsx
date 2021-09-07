import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import QueriesList from './QueriesList';

const render = (overProps: any = {}) => {
  const props = {
    savedQueries: [],
    activeQuery: '',
    onSelectQuery: jest.fn(),
    onSortQueries: jest.fn(),
    sortSettings: {
      property: 'displayName',
      direction: 'ascending',
    },
    ...overProps,
  };

  const wrapper = rtlRender(<QueriesList {...props} />);

  return {
    wrapper,
    props,
  };
};

test('allows user to select saved query', () => {
  const query = {
    analysisType: 'count',
  };
  const savedQueries = [
    {
      name: 'purchases',
      displayName: 'Purchases',
      refreshRate: 0,
      query,
      lastModifiedDate: '2020-09-11',
      tags: [],
      visualization: {
        type: 'bar',
        chartSettings: {},
      },
    },
  ];

  const {
    wrapper: { getByTestId },
    props,
  } = render({ savedQueries });

  const queryItem = getByTestId('saved-query-item');
  fireEvent.click(queryItem);

  expect(props.onSelectQuery).toHaveBeenCalledWith('purchases', query);
});

test('allows user to sort saved query list by name', () => {
  const savedQueries = [
    {
      name: 'a/b tests',
      displayName: 'A/B tests',
      refreshRate: 0,
      query: {},
      lastModifiedDate: '2020-09-11',
      tags: [],
      visualization: {
        type: 'bar',
        chartSettings: {},
      },
    },
    {
      name: 'purchases',
      displayName: 'Purchases',
      refreshRate: 0,
      query: {},
      lastModifiedDate: '2020-09-11',
      tags: [],
      visualization: {
        type: 'bar',
        chartSettings: {},
      },
    },
  ];

  const {
    wrapper: { getByTestId },
    props,
  } = render({ savedQueries });

  const sortByName = getByTestId('table-header-name');
  fireEvent.click(sortByName);

  expect(props.onSortQueries).toHaveBeenCalledWith({
    property: 'displayName',
    direction: 'descending',
  });
});

test('allows user to sort saved query list by update date', () => {
  const savedQueries = [
    {
      name: 'a/b tests',
      displayName: 'A/B tests',
      refreshRate: 0,
      query: {},
      lastModifiedDate: '2020-11-11',
      tags: [],
      visualization: {
        type: 'bar',
        chartSettings: {},
      },
    },
    {
      name: 'purchases',
      displayName: 'Purchases',
      refreshRate: 0,
      query: {},
      lastModifiedDate: '2019-10-12',
      tags: [],
      visualization: {
        type: 'bar',
        chartSettings: {},
      },
    },
  ];

  const {
    wrapper: { getByTestId },
    props,
  } = render({ savedQueries });

  const sortByName = getByTestId('table-header-date');
  fireEvent.click(sortByName);

  expect(props.onSortQueries).toHaveBeenCalledWith({
    property: 'lastModifiedDate',
    direction: 'ascending',
  });
});
