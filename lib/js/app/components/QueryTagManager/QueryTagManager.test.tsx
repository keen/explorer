import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent, act } from '@testing-library/react';
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

jest.useFakeTimers();

test('allows user to add tag', () => {
  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render();

  const input = getByTestId('query-labels-input');
  fireEvent.change(input, { target: { value: 'marketing' } });

  act(() => {
    jest.runAllTimers();
  });

  const element = getByText('marketing (New label)');
  fireEvent.click(element);

  expect(props.onAddTag).toHaveBeenCalledWith('marketing');
});

test('do not allows user to add already existing tag', () => {
  const {
    wrapper: { getByTestId, getAllByText },
    props,
  } = render(
    {
      project: {
        tagsPool: ['marketing'],
      },
    },
    {
      tags: ['marketing'],
    }
  );

  const input = getByTestId('query-labels-input');
  fireEvent.change(input, { target: { value: 'marketing' } });

  act(() => {
    jest.runAllTimers();
  });

  const [listElement] = getAllByText('marketing');
  fireEvent.click(listElement);

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
