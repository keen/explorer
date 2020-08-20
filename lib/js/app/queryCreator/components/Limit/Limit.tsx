import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@keen.io/ui-core';

import Title from '../Title';

import {
  setLimit,
  getLimit,
  getGroupBy,
  getOrderBy,
} from '../../modules/query';

import text from './text.json';

type Props = {};

const Limit: FC<Props> = () => {
  const dispatch = useDispatch();
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
      <Title isDisabled={isDisabled}>{text.label}</Title>
      <Input
        disabled={isDisabled}
        type="number"
        variant="solid"
        data-testid="limit"
        id="limit"
        placeholder={text.placeholder}
        value={limit ? limit : ''}
        onChange={(e) => changeHandler(e.target.value)}
      />
    </>
  );
};

export default Limit;
