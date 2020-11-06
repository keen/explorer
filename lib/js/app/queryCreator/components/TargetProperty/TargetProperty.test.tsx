import React from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import TargetProperty from './TargetProperty';

import { createTree, createCollection } from '../../utils';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const props = {
    onChange: jest.fn(),
    property: undefined,
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <TargetProperty {...props} />
    </Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

jest.useFakeTimers();

test('allows user to select target property', async () => {
  const collectionSchema = { date: 'String', userId: 'String' };
  const storeState = {
    query: {
      targetProperty: 'date',
    },
    events: {
      schemas: {
        purchases: {
          schema: collectionSchema,
          tree: createTree(collectionSchema),
          list: createCollection(collectionSchema),
        },
      },
    },
  };

  const {
    props,
    wrapper: { getByText, getByTestId },
  } = render(storeState, { collection: 'purchases' });

  const propertyField = getByTestId('dropable-container');
  fireEvent.click(propertyField);

  const property = getByText('userId');
  fireEvent.click(property);

  expect(props.onChange).toHaveBeenCalledWith('userId');
});

test('allows user to search for target property', async () => {
  const collectionSchema = { category: 'String', industry: 'String' };

  const storeState = {
    query: {
      targetProperty: undefined,
    },
    events: {
      schemas: {
        purchases: {
          schema: collectionSchema,
          tree: createTree(collectionSchema),
          list: createCollection(collectionSchema),
        },
      },
    },
  };

  const {
    wrapper: { getByText, getByTestId, queryByText },
  } = render(storeState, { collection: 'purchases' });

  const propertyField = getByTestId('dropable-container');
  fireEvent.click(propertyField);

  const input = getByTestId('dropable-container-input');
  fireEvent.change(input, { target: { value: 'industry' } });

  act(() => {
    jest.runAllTimers();
  });

  expect(queryByText('category')).not.toBeInTheDocument();
  expect(getByText('industry')).toBeInTheDocument();
});

test('expands search results', async () => {
  const collectionSchema = { 'category.geology.plants.flower': 'String' };

  const storeState = {
    query: {
      targetProperty: undefined,
    },
    events: {
      schemas: {
        purchases: {
          schema: collectionSchema,
          tree: createTree(collectionSchema),
          list: createCollection(collectionSchema),
        },
      },
    },
  };

  const {
    wrapper: { getByText, getByTestId },
  } = render(storeState, { collection: 'purchases' });

  const propertyField = getByTestId('dropable-container');
  fireEvent.click(propertyField);

  const input = getByTestId('dropable-container-input');
  fireEvent.change(input, { target: { value: 'flower' } });

  act(() => {
    jest.runAllTimers();
  });

  expect(getByText('flower')).toBeInTheDocument();
});

test('renders empty search results message', async () => {
  const collectionSchema = {};
  const storeState = {
    query: {
      targetProperty: undefined,
    },
    events: {
      schemas: {
        purchases: {
          schema: collectionSchema,
          tree: createTree(collectionSchema),
          list: createCollection(collectionSchema),
        },
      },
    },
  };

  const {
    wrapper: { getByText, getByTestId },
  } = render(storeState, { collection: 'purchases' });

  const propertyField = getByTestId('dropable-container');
  fireEvent.click(propertyField);

  const input = getByTestId('dropable-container-input');
  fireEvent.change(input, { target: { value: 'industry' } });

  act(() => {
    jest.runAllTimers();
  });

  expect(
    getByText('query_creator_target_property.empty_search_results')
  ).toBeInTheDocument();
});

test('reset target property settings', async () => {
  const collectionSchema = { date: 'String', userId: 'String' };
  const storeState = {
    query: {
      targetProperty: 'date',
    },
    events: {
      schemas: {
        purchases: {
          schema: collectionSchema,
          tree: createTree(collectionSchema),
          list: createCollection(collectionSchema),
        },
      },
    },
  };

  const {
    props,
    wrapper: { unmount },
  } = render(storeState, { collection: 'purchases' });
  unmount();

  expect(props.onChange).toHaveBeenCalledWith(null);
});

test('should render tooltip', async () => {
  const collectionSchema = { date: 'String', userId: 'String' };
  const storeState = {
    query: {
      targetProperty: 'date',
    },
    events: {
      schemas: {
        purchases: {
          schema: collectionSchema,
          tree: createTree(collectionSchema),
          list: createCollection(collectionSchema),
        },
      },
    },
  };

  const {
    wrapper: { getByText, getByTestId },
  } = render(storeState);

  const wrapper = getByTestId('target-property-wrapper');
  fireEvent.mouseEnter(wrapper);

  waitFor(() => {
    expect(
      getByText('query_creator_target_property.event_stream')
    ).toBeInTheDocument();
  });
});
