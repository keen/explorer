import React, { FC, useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Tooltip, Input } from '@keen.io/ui-core';

import Title from '../Title';

import { Container, TooltipContainer } from './Percentile.styles';

import { getPercentileValue } from './utils/getPercentileValue';

import { HIDE_TIME } from './constants';

type Props = {
  /** Percentile value */
  value?: number;
  /** Reset value event handler */
  onReset: () => void;
  /** Change value event handler */
  onChange: (value?: number) => void;
};

export const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

const Percentile: FC<Props> = ({ value, onReset, onChange }) => {
  const containerRef = useRef(null);
  const hideTooltip = useRef(null);
  const { t } = useTranslation();

  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    return () => onReset();
  }, []);

  const changeHandler = useCallback(
    (eventValue) => {
      if (eventValue.target.value) {
        const percentile = parseInt(eventValue.target.value);
        const { value, outRange } = getPercentileValue(percentile);
        onChange(value);
        if (hideTooltip.current) clearTimeout(hideTooltip.current);
        setTooltip(outRange);
        hideTooltip.current = setTimeout(() => {
          setTooltip(false);
        }, HIDE_TIME);
      } else {
        onReset();
      }
    },
    [onChange, onReset]
  );

  return (
    <Container ref={containerRef}>
      <AnimatePresence>
        {tooltip && (
          <TooltipContainer
            {...tooltipMotion}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
          >
            <Tooltip mode="dark" hasArrow={false}>
              {t('query_creator_percentile.message')}
            </Tooltip>
          </TooltipContainer>
        )}
      </AnimatePresence>
      <Title>{t('query_creator_percentile.label')}</Title>
      <Input
        type="number"
        variant="solid"
        value={value ? value : ''}
        placeholder={t('query_creator_percentile.placeholder')}
        onChange={(e) => changeHandler(e)}
      />
    </Container>
  );
};

export default Percentile;
