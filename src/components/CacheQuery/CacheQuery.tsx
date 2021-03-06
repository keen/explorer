import React, { FC, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { transparentize } from 'polished';
import { Checkbox } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import {
  Container,
  CacheSwitch,
  CacheLimit,
  LimitReached,
  TooltipMotion,
  CheckboxContainer,
} from './CacheQuery.styles';

import { LimitTooltip } from './components';
import CacheRefreshRate from '../CacheRefreshRate';

import { TOOLTIP_MOTION } from '../../constants';
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
};

const CacheQuery: FC<Props> = ({
  isCached,
  isLimited,
  onCacheChange,
  onRefreshRateChange,
  refreshRate,
}) => {
  const { t } = useTranslation();
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
      <CacheSwitch htmlFor={CHECKBOX_ID}>
        <CheckboxContainer>
          <Checkbox
            id={CHECKBOX_ID}
            type="secondary"
            checked={isCached}
            onChange={() => cacheChangeHandler()}
          />
        </CheckboxContainer>
        <BodyText
          variant="body2"
          color={
            isLimited && !isCached
              ? transparentize(0.5, colors.black[100])
              : colors.black[100]
          }
          fontWeight="bold"
          lineHeight={1}
        >
          {t('cache_query.cache')}
        </BodyText>
      </CacheSwitch>
      {isCached && (
        <>
          <BodyText variant="body2" fontWeight="bold" lineHeight={1}>
            {t('cache_query.refresh_interval')}
          </BodyText>
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
          <BodyText variant="body2" color={colors.blue['500']} lineHeight={1}>
            {t('cache_query.queries_limit')}
          </BodyText>
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
