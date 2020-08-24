import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import QueryTagManager from './QueryTagManager';

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
    onRemoveTag: jest.fn(),
    onAddTag: jest.fn(),
    tags: [],
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <QueryTagManager {...props} />
    </Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

test('allows user to add tag', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const input = getByTestId('query-labels-input');
  fireEvent.change(input, { target: { value: 'marketing' } });
  fireEvent.keyPress(input, { keyCode: 13 });

  expect(props.onAddTag).toHaveBeenCalledWith('marketing');
});

test('do not allows user to add already existing tag', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render(
    {},
    {
      tags: ['marketing'],
    }
  );

  const input = getByTestId('query-labels-input');
  fireEvent.change(input, { target: { value: 'marketing' } });
  fireEvent.keyPress(input, { keyCode: 13 });

  expect(props.onAddTag).not.toHaveBeenCalled();
});

test('allows user to remove existing tag', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render(
    {},
    {
      tags: ['marketing'],
    }
  );

  const tagElement = getByTestId('badge-remove');
  fireEvent.click(tagElement);

  expect(props.onRemoveTag).toHaveBeenCalledWith('marketing');
});
