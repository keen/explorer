import React, { FC, useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Tooltip } from '@keen.io/ui-core';

import {
  Container,
  Units,
  Input,
  TooltipContent,
  TooltipMotion,
} from './CacheRefreshRate.styles';
import text from './text.json';

import { HIDE_HINT_TIME } from './constants';

const tooltipMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
  /** Refresh rate value */
  refreshRate?: number;
  /** Minimum refresh rate value */
  minimumRate: number;
  /** Maximum refresh rate value */
  maximumRate: number;
  /** Change event handler */
  onChange: (rate: number) => void;
};

const CacheRefreshRate: FC<Props> = ({
  refreshRate,
  onChange,
  minimumRate,
  maximumRate,
}) => {
  const [showHint, setHintVisibility] = useState(false);
  const hideHintTrigger = useRef(null);

  const blurEventHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      let rate = parseInt(e.currentTarget.value);
      let showValueHint = false;

      if (Number.isNaN(rate) || rate < minimumRate) {
        rate = minimumRate;
        showValueHint = true;
      } else if (rate > maximumRate) {
        rate = maximumRate;
        showValueHint = true;
      }

      if (hideHintTrigger.current) clearTimeout(hideHintTrigger.current);
      if (showValueHint) {
        setHintVisibility(true);
        hideHintTrigger.current = setTimeout(
          () => setHintVisibility(false),
          HIDE_HINT_TIME
        );
      }

      onChange(rate);
    },
    [onChange]
  );

  return (
    <Container data-testid="cache-refresh-rate">
      <Input
        type="number"
        data-testid="refresh-rate-input"
        value={refreshRate ? refreshRate : ''}
        onBlur={blurEventHandler}
        onChange={(e) => onChange(parseInt(e.currentTarget.value))}
      />
      <Units>{text.cacheUnits}</Units>
      <AnimatePresence>
        {showHint && (
          <TooltipMotion {...tooltipMotion} data-testid="refresh-rate-hint">
            <Tooltip hasArrow={false} mode="dark">
              <TooltipContent>{text.refreshRateHint}</TooltipContent>
            </Tooltip>
          </TooltipMotion>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default CacheRefreshRate;
