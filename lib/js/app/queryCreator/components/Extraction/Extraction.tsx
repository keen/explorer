import React, { FC, useCallback, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Tooltip } from '@keen.io/ui-core';
import { AnimatePresence } from 'framer-motion';

import {
  LimitContainer,
  LimitInput,
  HintMessage,
  TooltipMotion,
} from './Extraction.styles';
import text from './text.json';

import { ExtractionProperties } from './components';
import Title from '../Title';

import {
  setPropertyNames,
  setExtractionLimit,
  getExtractionLimit,
  resetExtraction,
  getExtractionPropertyNames,
} from '../../modules/query';

import {
  HINT_MARKUP,
  DEFAULT_LIMIT,
  PREVIEW_EVENTS_LIMIT,
  HIDE_TIME,
} from './constants';

const tooltipMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
  /** Events collection identifer */
  collection: string;
};

const Extraction: FC<Props> = ({ collection }) => {
  const dispatch = useDispatch();
  const [showLimitHint, setLimitHintVisibility] = useState(false);
  const hideLimitHintTrigger = useRef(null);

  const extractionLimit = useSelector(getExtractionLimit);
  const properties = useSelector(getExtractionPropertyNames);

  const changeLimitHandler = useCallback((eventValue) => {
    if (eventValue) {
      const value = parseInt(eventValue);
      if (value > PREVIEW_EVENTS_LIMIT) {
        if (hideLimitHintTrigger.current)
          clearTimeout(hideLimitHintTrigger.current);
        dispatch(setExtractionLimit(PREVIEW_EVENTS_LIMIT));

        setLimitHintVisibility(true);
        hideLimitHintTrigger.current = setTimeout(
          () => setLimitHintVisibility(false),
          HIDE_TIME
        );
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

  return (
    <>
      <ExtractionProperties
        properties={properties ? properties : []}
        collection={collection}
        onSetProperties={(properties) => dispatch(setPropertyNames(properties))}
      />
      <LimitContainer>
        <Title>{text.limitLabel}</Title>
        <LimitInput>
          <Input
            type="number"
            variant="solid"
            value={extractionLimit ? extractionLimit : DEFAULT_LIMIT}
            placeholder={text.limitPlaceholder}
            onChange={(e) => changeLimitHandler(e.target.value)}
          />
          <AnimatePresence>
            {showLimitHint && (
              <TooltipMotion
                {...tooltipMotion}
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
        </LimitInput>
      </LimitContainer>
    </>
  );
};

export default Extraction;
