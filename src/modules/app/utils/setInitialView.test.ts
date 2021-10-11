import { setInitialView } from './setInitialView';

import { URL_STATE } from '../constants';

const setup = (url: URL) => {
  delete window.location;
  window.location = url;
};

const baseURL = 'https://keen-explorer.io';

test('returns "browser" view with connected route', () => {
  setup(new URL(baseURL));

  expect(setInitialView('browser', undefined)).toMatchInlineSnapshot(`
    Object {
      "route": "/browser",
      "view": "browser",
    }
  `);
});

test('returns "browser" view with saved query in search params', () => {
  setup(new URL(baseURL));
  const savedQuery = 'purchases';

  expect(setInitialView('browser', savedQuery)).toMatchObject({
    route: `/browser?savedQuery=${savedQuery}`,
    view: 'browser',
  });
});

test('returns "editor" view with connected route', () => {
  const url = `${baseURL}?${URL_STATE}=base64Query`;
  setup(new URL(url));

  expect(setInitialView('browser', undefined)).toMatchInlineSnapshot(`
    Object {
      "route": "/editor",
      "view": "editor",
    }
  `);
});
