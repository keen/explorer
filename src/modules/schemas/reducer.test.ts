import { schemasSlice, initialState } from './reducer';

test('set properties count', () => {
  const action = schemasSlice.actions.setEventStreamProperties({
    eventStream: 'logins',
    propertiesCount: 50,
  });
  const { eventStreams } = schemasSlice.reducer(initialState, action);

  expect(eventStreams).toMatchInlineSnapshot(`
    Object {
      "logins": 50,
    }
  `);
});
