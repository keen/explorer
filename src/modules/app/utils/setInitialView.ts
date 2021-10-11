import { URL_STATE } from '../constants';

import { INITIAL_VIEWS } from '../../../constants';

import { Views } from '../../../types';

export type InitialRouteSettings = {
  view: Views;
  route: string;
};

export const setInitialView = (
  initialView: Views = 'browser',
  savedQuery: string
): InitialRouteSettings => {
  const locationUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(locationUrl.search);

  if (searchParams && searchParams.get(URL_STATE)) {
    return {
      view: 'editor',
      route: INITIAL_VIEWS['editor'],
    };
  }

  if (savedQuery) {
    return {
      view: 'browser',
      route: `${INITIAL_VIEWS['browser']}?savedQuery=${savedQuery}`,
    };
  }

  return {
    view: initialView,
    route: INITIAL_VIEWS[initialView],
  };
};
