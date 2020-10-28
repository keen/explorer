import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import FunnelStep from './FunnelStep';

const props = {
  id: 'id',
  index: 0,
  detailsVisible: false,
  timeframe: 'this_14_days',
  timezone: 0,
  filters: [],
  inverted: false,
  optional: false,
  isFirstStep: true,
};

const mockStore = configureStore([]);
const state = {
  steps: [],
  events: {
    collections: [],
    loadingSchemas: [],
    schemas: {},
  },
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

test('calls "onLabelChange" handler', () => {
  const mockFn = jest.fn();
  const stepLabel = 'stepLabel';
  const { container } = render(
    <Provider store={store}>
      <FunnelStep
        {...props}
        detailsVisible
        onRemove={jest.fn()}
        onClone={jest.fn()}
        setDetailsVisible={jest.fn()}
        onLabelChange={mockFn}
      />
    </Provider>
  );

  const label = container.querySelector(`#stepName-${props.id}-${props.index}`);
  fireEvent.change(label, { target: { value: stepLabel } });

  expect(mockFn).toHaveBeenCalledWith(stepLabel, props.index);
});
