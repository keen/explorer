export const DEFAULT_STANDARD_INTERVAL = 'daily';
export const DEFAULT_CUSTOM_INTERVAL = 'every_7_days';

export const STANDARD_TAB = 'standard';
export const CUSTOM_TAB = 'custom';

import text from './text.json';

export const TABS_SETTINGS = [
  {
    label: text.standard,
    id: STANDARD_TAB,
  },
  {
    label: text.custom,
    id: CUSTOM_TAB,
  },
];
