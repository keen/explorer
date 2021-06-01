import { SortMode } from '@keen.io/ui-core';

export type SortProperty = 'displayName' | 'lastModifiedDate';

export type QueriesSortSettings = {
  direction: SortMode;
  property: SortProperty;
};
