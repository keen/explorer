import { b64EncodeUnicode, b64DecodeUnicode } from './base64';

test('decodes base64 string', () => {
  const state = JSON.stringify({ name: 'Purchases' });
  const encodedState = b64EncodeUnicode(state);

  expect(b64DecodeUnicode(encodedState)).toEqual(state);
});
