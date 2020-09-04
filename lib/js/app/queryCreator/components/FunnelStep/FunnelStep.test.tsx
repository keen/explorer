import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import FunnelStep from './FunnelStep';

const props = {
  index: 0,
  detailsVisible: false,
  timeframe: 'this_14_days',
  timezone: 0,
  filters: [],
  inverted: false,
  optional: false,
};

const mockStore = configureStore([]);
const state = {
  steps: [],
};

const store = mockStore({ ...state });

test('calls "onRemove" handler', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <Provider store={store}>
      <FunnelStep
        {...props}
        onRemove={mockFn}
        onClone={jest.fn()}
        setDetailsVisible={jest.fn()}
      />
    </Provider>
  );

  const removeButton = getByTestId('close-button');
  fireEvent.click(removeButton);

  expect(mockFn).toHaveBeenCalled();
});

test('calls "onClone" handler', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <Provider store={store}>
      <FunnelStep
        {...props}
        onRemove={jest.fn()}
        onClone={mockFn}
        setDetailsVisible={jest.fn()}
      />
    </Provider>
  );

  const cloneButton = getByTestId('clone-button');
  fireEvent.click(cloneButton);

  expect(mockFn).toHaveBeenCalled();
});

test('calls "setDetailsVisible" handler', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <Provider store={store}>
      <FunnelStep
        {...props}
        onRemove={jest.fn()}
        onClone={jest.fn()}
        setDetailsVisible={mockFn}
      />
    </Provider>
  );

  const stepBar = getByTestId('bar');
  fireEvent.click(stepBar);

  expect(mockFn).toHaveBeenCalled();
});
