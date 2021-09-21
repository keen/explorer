import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Middleware, Action } from 'redux';
import { Views } from '../types';

/**
 * Creates route update middleware that notifies container applications
 * @param updateHandler - Update view handler
 *
 * @return Middleware - redux middleware
 *
 */

const ROUTES_MAP: Record<string, Views> = {
  '/browser': 'browser',
  '/editor': 'editor',
};

export const createViewUpdateMiddleware = (updateHandler): Middleware => () => (
  next
) => (action: Action) => {
  if (action.type === LOCATION_CHANGE) {
    const {
      payload: {
        location: { pathname, search },
      },
    } = action as LocationChangeAction;
    const searchParams = new URLSearchParams(search);

    const savedQuery = searchParams.get('savedQuery');
    updateHandler(ROUTES_MAP[pathname], savedQuery);
  }
  next(action);
};
