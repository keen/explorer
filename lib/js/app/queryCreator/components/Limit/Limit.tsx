import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Input } from '@keen.io/ui-core';

import Title from '../Title';

import {
  setLimit,
  getLimit,
  getGroupBy,
  getOrderBy,
} from '../../modules/query';

type Props = {};

const Limit: FC<Props> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const limit = useSelector(getLimit);
  const groupBy = useSelector(getGroupBy);
  const orderBy = useSelector(getOrderBy);
  const isDisabled = !groupBy || !orderBy;

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
    </>
  );
};

export default Limit;
