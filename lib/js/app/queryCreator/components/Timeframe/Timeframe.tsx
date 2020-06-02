import React, { FC, useEffect } from 'react';
import { Label } from '@keen.io/ui-core';

import text from './text.json';

import RelativeTime from './RelativeTime';
import { convertRelativeTime } from './utils/convertRelativeTime';

import { DEFAULT_TIMEFRAME } from '../../modules/query';

import { Timeframe as TimeframeType } from '../../modules/query';

type Props = {
  /** Timeframe change event handler */
  onChange: (timeframe: TimeframeType) => void;
  /** Current timeframe value */
  value: TimeframeType;
  /** Reset field event handler */
  onReset?: () => void;
};

const Timeframe: FC<Props> = ({ onChange, onReset, value }) => {
  useEffect(() => {
    return () => {
      if (onReset) onReset();
    };
  }, []);

  return (
    <>
      <div onClick={() => onChange(DEFAULT_TIMEFRAME)}>{text.relative}</div>
      <div>{text.absolute}</div>
      <Label>{text.label}</Label>
      {typeof value === 'string' ? (
        <RelativeTime onChange={onChange} {...convertRelativeTime(value)} />
      ) : (
        <div>Absolute</div>
      )}
    </>
  );
};

export default Timeframe;
