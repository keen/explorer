import React from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import GroupBy from './GroupBy';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const wrapper = rtlRender(
    <Provider store={store}>
      <GroupBy {...overProps} />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('allows users to add group by settings', async () => {
  const storeState = {
    query: {
      groupBy: undefined,
    },
    events: {
      schemas: {
        purchases: { date: 'String', userId: 'String' },
      },
    },
  };

  const {
    wrapper: { getByTestId },
    store,
  } = render(storeState, { collection: 'purchases' });
  const button = getByTestId('action-button');
  fireEvent.click(button);

  waitFor(() => {
    expect(store.getActions()).toMatchInlineSnapshot(`Array []`);
  });
});
