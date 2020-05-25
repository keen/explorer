import React, { FC, useMemo } from 'react';
import { Checkbox, Label, Select } from '@keen.io/ui-core';
import { FieldGroup } from '@keen.io/forms';

import { CacheLabel, RefreshSettings } from './CacheQuery.styles';
import { CHECKBOX_ID, REFRESH_MINIMUM, REFRESH_MAXIMUM } from './constants';

type Props = {
  /** Query cache state */
  isCached: boolean;
  /** Cached query limits reached */
  isLimited: boolean;
  /** Query cache settings change event handler */
  onCacheChange: (isCached: boolean) => void;
  /** Query refresh rate change event handler */
  onRefreshRateChange: (rate: number) => void;
  /** Current query refresh rate */
  refreshRate?: number;
  /** Query cache refresh minimum treshold */
  minimumRefreshRate?: number;
  /** Query cache refresh maximum treshold */
  maximumRefreshRate?: number;
};

const CacheQuery: FC<Props> = ({
  isCached,
  isLimited,
  onCacheChange,
  onRefreshRateChange,
  refreshRate,
  minimumRefreshRate = REFRESH_MINIMUM,
  maximumRefreshRate = REFRESH_MAXIMUM,
}) => {
  const refreshRates = useMemo(
    () =>
      new Array(maximumRefreshRate - minimumRefreshRate + 1)
        .fill(true)
        .map((_v, idx) => {
          const rate = minimumRefreshRate + idx;
          return { label: rate.toString(), value: rate };
        }),
    []
  );

  return (
    <div>
      <CacheLabel htmlFor={CHECKBOX_ID} disabled={isLimited && !isCached}>
        <Checkbox
          id={CHECKBOX_ID}
          checked={isCached}
          onChange={() => onCacheChange(!isCached)}
        />
        Cache
      </CacheLabel>
      {isLimited && <div>Limit reached</div>}
      {isCached && (
        <RefreshSettings data-test="refresh-settings">
          <FieldGroup>
            <Label>Refresh interval [hours]</Label>
            <Select
              placeholder="Search or select country"
              value={refreshRate && { label: refreshRate, value: refreshRate }}
              onChange={({ value }: { value: number }) =>
                onRefreshRateChange(value)
              }
              options={refreshRates}
            />
          </FieldGroup>
        </RefreshSettings>
      )}
    </div>
  );
};

export default CacheQuery;
