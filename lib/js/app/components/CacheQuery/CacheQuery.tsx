import React, { FC, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Checkbox, Select, Tooltip, Label } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import {
  Container,
  CacheSwitch,
  CacheLimit,
  CheckboxLabel,
  RefreshSettings,
  SelectContainer,
  LimitReached,
  TooltipMotion,
  TooltipContent,
} from './CacheQuery.styles';
import { CHECKBOX_ID, REFRESH_MINIMUM, REFRESH_MAXIMUM } from './constants';

import text from './text.json';

const tooltipMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

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
  const [tooltip, setTooltip] = useState({
    visible: false,
  });

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
    <Container>
      <CacheSwitch htmlFor={CHECKBOX_ID} disabled={isLimited && !isCached}>
        <Checkbox
          id={CHECKBOX_ID}
          checked={isCached}
          onChange={() => onCacheChange(!isCached)}
        />
        <CheckboxLabel>
          <Label variant="secondary" htmlFor={CHECKBOX_ID}>
            {text.cache}
          </Label>
        </CheckboxLabel>
      </CacheSwitch>
      {isCached && (
        <RefreshSettings data-test="refresh-settings">
          <div>{text.refreshInterval}</div>
          <SelectContainer>
            <Select
              variant="solid"
              placeholder={text.refreshRatePlaceholder}
              value={refreshRate && { label: refreshRate, value: refreshRate }}
              onChange={({ value }: { value: number }) =>
                onRefreshRateChange(value)
              }
              options={refreshRates}
            />
          </SelectContainer>
        </RefreshSettings>
      )}
      {isLimited && (
        <CacheLimit>
          {text.queriesLimit}
          <LimitReached
            data-test="cache-limit"
            onMouseEnter={() => setTooltip({ visible: true })}
            onMouseLeave={() => setTooltip({ visible: false })}
          >
            <Icon type="info" fill={colors.blue['500']} />
            <AnimatePresence>
              {tooltip.visible && (
                <TooltipMotion {...tooltipMotion}>
                  <Tooltip arrowDirection="bottom">
                    <TooltipContent>
                      <p>{text.limitReachedMessage}</p>
                      <p>{text.disableMessage}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipMotion>
              )}
            </AnimatePresence>
          </LimitReached>
        </CacheLimit>
      )}
    </Container>
  );
};

export default CacheQuery;
