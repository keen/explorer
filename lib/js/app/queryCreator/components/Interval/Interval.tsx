import React, { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@keen.io/ui-core';

import SupportedInterval from '../SupportedInterval';
import CustomInterval from '../CustomInterval';

import { isCustomInterval } from './utils/isCustomInterval';
import text from './text.json';

import { getInterval, setInterval } from '../../modules/query';

import {
  DEFAULT_STANDARD_INTERVAL,
  DEFAULT_CUSTOM_INTERVAL,
} from './constants';

type Props = {};

const Interval: FC<Props> = () => {
  const dispatch = useDispatch();
  const interval = useSelector(getInterval);

  const customInterval = isCustomInterval(interval);

  const changeHandler = useCallback(
    (interval) => dispatch(setInterval(interval)),
    []
  );

  useEffect(() => {
    return () => dispatch(setInterval(undefined));
  }, []);

  return (
    <div>
      <ul>
        <li
          data-testid="supported-interval-tab"
          onClick={() => dispatch(setInterval(DEFAULT_STANDARD_INTERVAL))}
        >
          {text.standard}
        </li>
        <li
          data-testid="custom-interval-tab"
          onClick={() => dispatch(setInterval(DEFAULT_CUSTOM_INTERVAL))}
        >
          {text.custom}
        </li>
      </ul>
      <Button
        variant="secondary"
        style="outline"
        onClick={() => dispatch(setInterval(undefined))}
      >
        {text.clearInterval}
      </Button>
      {customInterval ? (
        <CustomInterval interval={interval} onChange={changeHandler} />
      ) : (
        <SupportedInterval interval={interval} onChange={changeHandler} />
      )}
    </div>
  );
};

export default Interval;
