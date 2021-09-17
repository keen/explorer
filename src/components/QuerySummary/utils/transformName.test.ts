import { transformName } from './transformName';

test('transform analysis name which does not include _', () => {
  const analysisName = 'sum';
  const result = transformName(analysisName);
  expect(result).toMatchInlineSnapshot(`"Sum"`);
});

test('transform analysis name which includes _', () => {
  const analysisName = 'count_unique';
  const result = transformName(analysisName);
  expect(result).toMatchInlineSnapshot(`"Count unique"`);
});
