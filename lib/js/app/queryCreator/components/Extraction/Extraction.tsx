import React, { FC, useCallback, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Input, Tooltip } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import { AnimatePresence } from 'framer-motion';

import {
  LimitContainer,
  LimitInput,
  HintMessage,
  TooltipMotion,
  TitleWrapper,
  TooltipContainer,
} from './Extraction.styles';

import { ExtractionProperties } from './components';
import Title from '../Title';

import {
  setPropertyNames,
  setExtractionLimit,
  getExtractionLimit,
  resetExtraction,
  getExtractionPropertyNames,
} from '../../modules/query';

import { TOOLTIP_MOTION } from '../../constants';
import { DEFAULT_LIMIT, PREVIEW_EVENTS_LIMIT } from './constants';

type Props = {
  /** Events collection identifer */
  collection: string;
};

const Extraction: FC<Props> = ({ collection }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [tooltip, setTooltip] = useState({
    visible: false,
  });

  const extractionLimit = useSelector(getExtractionLimit);
  const properties = useSelector(getExtractionPropertyNames);

  const changeLimitHandler = useCallback((eventValue) => {
    if (eventValue) {
      const value = parseInt(eventValue);
      if (value > PREVIEW_EVENTS_LIMIT) {
        dispatch(setExtractionLimit(PREVIEW_EVENTS_LIMIT));
      } else {
        dispatch(setExtractionLimit(value));
      }
    } else {
      dispatch(setExtractionLimit(DEFAULT_LIMIT));
    }
  }, []);

  useEffect(() => {
    return () => dispatch(resetExtraction());
  }, []);

  const HINT_MARKUP = useMemo(
    () =>
      `${t('extraction.maximum_email_events_limit')}<br /><br />${t(
        'extraction.email_events_limit_first'
      )} <strong>${t('extraction.extraction_to_email')}</strong>${t(
        'extraction.email_events_limit_second'
      )}`,
    []
  );

  return (
    <>
      <ExtractionProperties
        properties={properties ? properties : []}
        collection={collection}
        onSetProperties={(properties) => dispatch(setPropertyNames(properties))}
      />
      <LimitContainer>
        <TitleWrapper>
          <Title>{t('extraction.limit_label')}</Title>
          <TooltipContainer
            onMouseEnter={() => setTooltip({ visible: true })}
            onMouseLeave={() => setTooltip({ visible: false })}
          >
            <Icon type="info" fill={colors.blue['500']} />
            <AnimatePresence>
              {tooltip.visible && (
                <TooltipMotion
                  {...TOOLTIP_MOTION}
                  data-testid="extraction-limit-hint"
                >
                  <Tooltip hasArrow={false} mode="dark">
                    <HintMessage
                      dangerouslySetInnerHTML={{
                        __html: HINT_MARKUP,
                      }}
                    />
                  </Tooltip>
                </TooltipMotion>
              )}
            </AnimatePresence>
          </TooltipContainer>
        </TitleWrapper>
        <LimitInput>
          <Input
            type="number"
            variant="solid"
            value={extractionLimit ? extractionLimit : DEFAULT_LIMIT}
            placeholder={t('extraction.limit_placeholder')}
            onChange={(e) => changeLimitHandler(e.target.value)}
          />
        </LimitInput>
      </LimitContainer>
    </>
  );
};

export default Extraction;
