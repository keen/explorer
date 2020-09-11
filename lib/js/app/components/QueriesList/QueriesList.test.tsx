import React from 'react';
import {
  render as rtlRender,
  getNodeText,
  fireEvent,
} from '@testing-library/react';

import QueriesList from './QueriesList';

const render = (overProps: any = {}) => {
  const props = {
    savedQueries: [],
    activeQuery: '',
    onSelectQuery: jest.fn(),
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
    },
    {
      name: 'purchases',
      displayName: 'Purchases',
      refreshRate: 0,
      query: {},
      lastModifiedDate: '2020-09-11',
      tags: [],
    },
  ];

  const {
    wrapper: { getAllByTestId, getByTestId },
  } = render({ savedQueries });

  const sortByName = getByTestId('table-header-name');
  fireEvent.click(sortByName);

  const [firstQuery, secondQuery] = getAllByTestId('saved-query-name');

  expect(getNodeText(firstQuery)).toEqual('Purchases');
  expect(getNodeText(secondQuery)).toEqual('A/B tests');
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
    },
    {
      name: 'purchases',
      displayName: 'Purchases',
      refreshRate: 0,
      query: {},
      lastModifiedDate: '2019-10-12',
      tags: [],
    },
  ];

  const {
    wrapper: { getAllByTestId, getByTestId },
  } = render({ savedQueries });

  const sortByName = getByTestId('table-header-date');
  fireEvent.click(sortByName);

  const [firstQuery, secondQuery] = getAllByTestId('saved-query-date');

  expect(getNodeText(firstQuery)).toEqual('2019/10/12');
  expect(getNodeText(secondQuery)).toEqual('2020/11/11');
});
