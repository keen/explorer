import React, { FC, useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@keen.io/ui-core';

import {
  Container,
  Units,
  Input,
  TooltipContent,
  TooltipMotion,
} from './CacheRefreshRate.styles';

import { TOOLTIP_MOTION } from '../../constants';
import { HIDE_HINT_TIME } from './constants';

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
  const { t } = useTranslation();
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
      <Units>{t('cache_refresh_rate.cache_units')}</Units>
      <AnimatePresence>
        {showHint && (
          <TooltipMotion {...TOOLTIP_MOTION} data-testid="refresh-rate-hint">
            <Tooltip hasArrow={false} mode="dark">
              <TooltipContent>
                {t('cache_refresh_rate.refresh_rate_hint')}
              </TooltipContent>
            </Tooltip>
          </TooltipMotion>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default CacheRefreshRate;
