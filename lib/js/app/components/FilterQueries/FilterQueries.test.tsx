import React from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import FilterQueries from './FilterQueries';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    project: {
      tagsPool: [],
    },
    ...storeState,
  };

  const store = mockStore({ ...state });

  const props = {
    tagsFilters: [],
    showOnlyCachedQueries: false,
    onUpdateCacheFilter: jest.fn(),
    onUpdateTagsFilters: jest.fn(),
    onClearFilters: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <FilterQueries {...props} />
    </Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

test('allows user to filter queries based on cache criteris', async () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const element = getByText('browser_filters.title');
  fireEvent.click(element);

  await waitFor(() => {
    const cacheFilter = getByText('browser_filters.show_only_cached_queries');
    fireEvent.click(cacheFilter);

    expect(props.onUpdateCacheFilter).toHaveBeenLastCalledWith(true);
  });
});
