import { setOperator } from './setOperator';

test('fallbacks to default operator', () => {
  const operator = setOperator('Geo', 'gte');

  expect(operator).toMatchInlineSnapshot(`"within"`);
});

test('do not changes the operator', () => {
  const operator = setOperator('String', 'eq');

  expect(operator).toMatchInlineSnapshot(`"eq"`);
});
