import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Input } from '@keen.io/ui-core';

import { setLimit, getLimit } from '../../modules/query';

import text from './text.json';

type Props = {};

const Limit: FC<Props> = () => {
  const dispatch = useDispatch();
  const limit = useSelector(getLimit);

  const changeHandler = useCallback(
    (eventValue) => {
      if (eventValue) {
        const limitValue = parseInt(eventValue);
        dispatch(setLimit(limitValue));
      } else {
        dispatch(setLimit(undefined));
      }
    },
    []
  );

  useEffect(() => {
    return () =>   dispatch(setLimit(undefined));
  }, [])

  return (
    <>
      <Label htmlFor="limit">{text.label}</Label>
      <Input
        type="number"
        id="limit"
        variant="solid"
        value={limit}
        onChange={(e) => changeHandler(e.target.value)}
      />
    </>
  );
}

export default Limit;
