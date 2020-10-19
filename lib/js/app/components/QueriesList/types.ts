import { SortMode } from '@keen.io/ui-core';

export type SortProperty = 'name' | 'lastModifiedDate';

export type QueriesSortSettings = {
  direction: SortMode;
  property: SortProperty;
};
