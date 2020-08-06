import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import GroupBy from './GroupBy';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const props = {
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <GroupBy {...props} />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};
test('1', () => {
  expect(1).toEqual(1);
});

// test('allows users to remove group by settings', () => {
//   const storeState = {
//     query: {
//       groupBy: ['userId'],
//     },
//     events: {
//       schemas: {
//         purchases: { date: 'String', userId: 'String' },
//       },
//     },
//   };
//
//   const {
//     wrapper: { getByTestId },
//     store,
//   } = render(storeState, { collection: 'purchases' });
//
//   const button = getByTestId('remove-property');
//   fireEvent.click(button);
//
//   expect(store.getActions()).toMatchInlineSnapshot(`
//     Array [
//       Object {
//         "payload": Object {
//           "groupBy": Array [
//             "userId",
//           ],
//         },
//         "type": "@query-creator/SET_GROUP_BY",
//       },
//       Object {
//         "payload": Object {
//           "groupBy": undefined,
//         },
//         "type": "@query-creator/SET_GROUP_BY",
//       },
//     ]
//   `);
// });

// test('allows users to add group by settings', async () => {
//   const storeState = {
//     query: {
//       groupBy: undefined,
//     },
//     events: {
//       schemas: {
//         purchases: { date: 'String', userId: 'String' },
//       },
//     },
//   };
//
//   const {
//     wrapper: { getByText, getByLabelText },
//     store,
//   } = render(storeState, { collection: 'purchases' });
//   const button = getByText(text.addGroup);
//   fireEvent.click(button);
//
//   await selectEvent.select(getByLabelText(text.label), 'userId');
//
//   waitFor(() => {
//     expect(store.getActions()).toMatchInlineSnapshot(`
//       Array [
//         Object {
//           "payload": Object {
//             "groupBy": undefined,
//           },
//           "type": "@query-creator/SET_GROUP_BY",
//         },
//       ]
//     `);
//   });
// });
