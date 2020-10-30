import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent, act } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import EventCollection from './EventCollection';

import { KEYBOARD_KEYS } from '../../constants';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const props = {
    onChange: jest.fn(),
    collection: null,
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <EventCollection {...props} />
    </Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

jest.useFakeTimers();

test('allows user to select event collection', () => {
  const storeState = {
    events: {
      collections: ['clicks', 'logins', 'purchases'],
    },
  };
  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render(storeState);

  const propertyField = getByTestId('dropable-container');
  fireEvent.click(propertyField);

  const property = getByText('logins');
  fireEvent.click(property);

  expect(props.onChange).toHaveBeenCalledWith('logins');
});

test('allows user to select event collection by using keyboard', async () => {
  const storeState = {
    events: {
      collections: ['clicks', 'logins', 'purchases'],
    },
  };
  const {
    wrapper: { getByTestId },
    props,
  } = render(storeState);

  const field = getByTestId('dropable-container');

  fireEvent.click(field);
  fireEvent.keyDown(field, { keyCode: KEYBOARD_KEYS.DOWN });
  fireEvent.keyDown(field, { keyCode: KEYBOARD_KEYS.ENTER });

  expect(props.onChange).toHaveBeenCalledWith('clicks');
});

test('allows user to search event collection', () => {
  const storeState = {
    events: {
      collections: ['clicks', 'logins', 'purchases'],
    },
  };
  const {
    wrapper: { getByTestId, getByText, queryByText },
  } = render(storeState);

  const propertyField = getByTestId('dropable-container');
  fireEvent.click(propertyField);

  const input = getByTestId('dropable-container-input');
  fireEvent.change(input, { target: { value: 'logins' } });

  act(() => {
    jest.runAllTimers();
  });

  expect(queryByText('purchases')).not.toBeInTheDocument();
  expect(getByText('logins')).toBeInTheDocument();
});

test('renders empty search results', () => {
  const storeState = {
    events: {
      collections: ['clicks'],
    },
  };
  const {
    wrapper: { getByTestId, getByText },
  } = render(storeState);

  const propertyField = getByTestId('dropable-container');
  fireEvent.click(propertyField);

  const input = getByTestId('dropable-container-input');
  fireEvent.change(input, { target: { value: 'purchases' } });

  act(() => {
    jest.runAllTimers();
  });

  expect(
    getByText('query_creator_event_collection.empty_search_results')
  ).toBeInTheDocument();
});

test('do not calls "onChange" handler for selecting same event collection', () => {
  const storeState = {
    events: {
      collections: ['clicks', 'logins', 'purchases'],
    },
  };
  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render(storeState, {
    collection: 'clicks',
  });

  const propertyField = getByTestId('dropable-container');
  fireEvent.click(propertyField);

  const property = getByText('clicks');
  fireEvent.click(property);

  expect(props.onChange).not.toHaveBeenCalled();
});
