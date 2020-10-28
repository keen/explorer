import React, { FC, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Checkbox } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import {
  Container,
  CacheSwitch,
  CacheLimit,
  CacheLabel,
  RefreshFrequency,
  LimitReached,
  TooltipMotion,
} from './CacheQuery.styles';

import { LimitTooltip } from './components';
import CacheRefreshRate from '../CacheRefreshRate';

import { TOOLTIP_MOTION } from '../../constants';
import { CHECKBOX_ID, REFRESH_MINIMUM, REFRESH_MAXIMUM } from './constants';
import text from './text.json';

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
};

const CacheQuery: FC<Props> = ({
  isCached,
  isLimited,
  onCacheChange,
  onRefreshRateChange,
  refreshRate,
}) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
  });

  const cacheChangeHandler = useCallback(() => {
    if (!isLimited || (isLimited && isCached)) {
      onCacheChange(!isCached);
    }
  }, [isLimited, isCached]);

  return (
    <Container>
      <CacheSwitch htmlFor={CHECKBOX_ID} disabled={isLimited && !isCached}>
        <Checkbox
          id={CHECKBOX_ID}
          type="secondary"
          checked={isCached}
          onChange={() => cacheChangeHandler()}
        />
        <CacheLabel disabled={isLimited && !isCached}>
          <label htmlFor={CHECKBOX_ID}>{text.cache}</label>
        </CacheLabel>
      </CacheSwitch>
      {isCached && (
        <>
          <RefreshFrequency>{text.refreshInterval}</RefreshFrequency>
          <CacheRefreshRate
            refreshRate={refreshRate}
            minimumRate={REFRESH_MINIMUM}
            maximumRate={REFRESH_MAXIMUM}
            onChange={onRefreshRateChange}
          />
        </>
      )}
      {isLimited && !isCached && (
        <CacheLimit>
          <span>{text.queriesLimit}</span>
          <LimitReached
            data-testid="cache-limit"
            onMouseEnter={() => setTooltip({ visible: true })}
            onMouseLeave={() => setTooltip({ visible: false })}
          >
            <Icon type="info" fill={colors.blue['500']} />
            <AnimatePresence>
              {tooltip.visible && (
                <TooltipMotion {...TOOLTIP_MOTION}>
                  <LimitTooltip />
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
