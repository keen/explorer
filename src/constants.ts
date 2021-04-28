/* eslint-disable @typescript-eslint/camelcase */

export const NEW_QUERY_EVENT = '@explorer/new-query';
export const CHANGE_VIEW_EVENT = '@explorer/change-view';

export const SHOW_TOAST_NOTIFICATION_EVENT =
  '@explorer/show-toast-notification';

export const NOTIFICATION_MANAGER_CONTEXT = 'notificationManager';
export const KEEN_CLIENT_CONTEXT = 'keenClient';
export const PUBSUB_CONTEXT = 'pubsub';
export const CONFIRM_EXTRACTION_LIMIT = 'extractionLimit';

export const BACKGROUND_MAIN = '#f1f6f8';

import { Analysis } from './types';

export const KEYBOARD_KEYS = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  ESCAPE: 27,
};

export const CACHE_AVAILABLE: Analysis[] = [
  'sum',
  'average',
  'count',
  'count_unique',
  'maximum',
  'minimum',
  'median',
  'percentile',
  'standard_deviation',
  'funnel',
  'select_unique',
];

export const ERRORS = {
  OVER_LIMIT_ERROR: 'OverCachedQueryLimitError',
  TOO_MANY_QUERIES: 'TooManyCachedQueriesInTheCurrentBillingPeriod',
};

export const API_VERSION = '3.0';

export const DEFAULT_EXTRACTION_CONFIRMATION_LIMIT = 7;
export const EXTRACTION_PREVIEW_EVENTS_DEFAULT = 100;
export const EXTRACTION_PREVIEW_EVENTS_LIMIT = 100000;
export const EXTRACTION_BULK_EVENTS_DEFAULT = 1000;
export const EXTRACTION_BULK_EVENTS_LIMIT = 10000000;

export const TOOLTIP_MOTION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const DEFAULT_TIMEZONE_FOR_QUERY = 'Etc/UTC';
