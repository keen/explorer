import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { Input, Tooltip } from '@keen.io/ui-core';

import Title from '../Title';
import TooltipContent from '../TooltipContent';
import { Wrapper, TooltipMotion } from './Limit.styles';

import {
  setLimit,
  getLimit,
  getGroupBy,
  getOrderBy,
} from '../../modules/query';

import { TOOLTIP_MOTION } from '../../constants';

type Props = {
  /** Collection name */
  collection: string;
};

const Limit: FC<Props> = ({ collection }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const limit = useSelector(getLimit);
  const groupBy = useSelector(getGroupBy);
  const orderBy = useSelector(getOrderBy);
  const isDisabled = !groupBy || !orderBy;
  const [hint, showHint] = useState(false);

  const changeHandler = useCallback((eventValue) => {
    if (eventValue) {
      const limitValue = parseInt(eventValue);
      dispatch(setLimit(limitValue));
    } else {
      dispatch(setLimit(undefined));
    }
  }, []);

  useEffect(() => {
    return () => dispatch(setLimit(undefined));
  }, []);

  useEffect(() => {
    if (isDisabled) {
      dispatch(setLimit(undefined));
    }
  }, [isDisabled]);

  return (
    <>
      <Title isDisabled={isDisabled}>{t('query_creator_limit.label')}</Title>
      <Wrapper
        data-testid="limit-wrapper"
        onMouseEnter={() => isDisabled && showHint(true)}
        onMouseLeave={() => isDisabled && showHint(false)}
      >
        <Input
          disabled={isDisabled}
          type="number"
          variant="solid"
          data-testid="limit"
          id="limit"
          placeholder={t('query_creator_limit.placeholder')}
          value={limit ? limit : ''}
          onChange={(e) => changeHandler(e.target.value)}
        />
        {isDisabled && (
          <AnimatePresence>
            {hint && (
              <TooltipMotion {...TOOLTIP_MOTION} data-testid="limit-hint">
                <Tooltip hasArrow={false} mode="dark">
                  <TooltipContent>
                    {collection ? (
                      <span>
                        <strong>{t('query_creator_limit.order')}</strong>{' '}
                        {t('query_creator_limit.limit_result')}
                      </span>
                    ) : (
                      <span>
                        {t('query_creator_limit.select')}{' '}
                        <strong>{t('query_creator_limit.event_stream')}</strong>{' '}
                        {t('query_creator_limit.tooltip')}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipMotion>
            )}
          </AnimatePresence>
        )}
      </Wrapper>
    </>
  );
};

export default Limit;
