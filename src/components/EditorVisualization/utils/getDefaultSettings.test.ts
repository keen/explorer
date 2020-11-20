import getDefaultSettings from './getDefaultSettings';

test('returns visualization default settings', () => {
  const result = getDefaultSettings('bar');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "chartSettings": Object {
        "groupMode": "grouped",
        "layout": "vertical",
      },
      "widgetSettings": Object {},
    }
  `);
});
