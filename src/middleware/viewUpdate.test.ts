import { Store } from 'redux';
import { LOCATION_CHANGE } from 'connected-react-router';

import { createViewUpdateMiddleware } from './viewUpdate';

test('calls "updateHandler" with editor view details', () => {
  const updateMock = jest.fn();
  const next = jest.fn();

  const store = {
    getState: () => ({
      app: {
        savedQuery: null,
      },
      savedQuery: {},
    }),
  } as Store;

  const middleware = createViewUpdateMiddleware(updateMock);
  const action = {
    type: LOCATION_CHANGE,
    payload: {
      isFirstRendering: false,
      location: {
        hash: '',
        search: '',
        query: {},
        state: null,
        pathname: '/editor',
      },
    },
  };

  middleware(store)(next)(action);

  expect(updateMock).toHaveBeenCalledWith('editor', null);
});

test('calls "updateHandler" with editor view details', () => {
  const updateMock = jest.fn();
  const next = jest.fn();

  const store = {
    getState: () => ({
      app: {
        savedQuery: '@savedQueryName',
      },
    }),
  } as Store;

  const middleware = createViewUpdateMiddleware(updateMock);
  const action = {
    type: LOCATION_CHANGE,
    payload: {
      isFirstRendering: false,
      location: {
        hash: '',
        search: {
          savedQuery: '@savedQueryName',
        },
        query: {},
        state: null,
        pathname: '/editor',
      },
    },
  };

  middleware(store)(next)(action);

  expect(updateMock).toHaveBeenCalledWith('editor', '@savedQueryName');
});

test('do not calls "updateHandler" method', () => {
  const updateMock = jest.fn();
  const next = jest.fn();

  const store = {
    getState: () => ({
      app: {
        savedQuery: '@savedQueryName',
      },
    }),
  } as Store;

  const middleware = createViewUpdateMiddleware(updateMock);
  const action = {
    type: '@action',
  };

  middleware(store)(next)(action);

  expect(updateMock).not.toHaveBeenCalled();
});

test('calls "next" action handler', () => {
  const updateMock = jest.fn();
  const next = jest.fn();

  const store = {
    getState: () => ({
      app: {
        savedQuery: '@savedQueryName',
      },
    }),
  } as Store;

  const middleware = createViewUpdateMiddleware(updateMock);
  const action = {
    type: '@action',
  };

  middleware(store)(next)(action);

  expect(next).toHaveBeenCalledWith(action);
});
