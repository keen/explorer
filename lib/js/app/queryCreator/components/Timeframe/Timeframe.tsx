import React, { FC, useEffect } from 'react';
import { Label } from '@keen.io/ui-core';

import text from './text.json';

import AbsoluteTime from '../AbsoluteTime';
import RelativeTime from '../RelativeTime';
import { getDefaultAbsoluteTime } from './utils/getDefaultAbsoluteTime';
import { convertRelativeTime } from './utils/convertRelativeTime';

import { DEFAULT_TIMEFRAME } from '../../modules/query';

import { Timeframe as TimeframeType } from '../../types';

type Props = {
  /** Unique identifer */
  id: string;
  /** Timeframe change event handler */
  onChange: (timeframe: TimeframeType) => void;
  /** Current timeframe value */
  value: TimeframeType;
  /** Reset field event handler */
  onReset?: () => void;
};

const Timeframe: FC<Props> = ({ id, onChange, onReset, value }) => {
  useEffect(() => {
    return () => {
      if (onReset) onReset();
    };
  }, []);

  return (
    <>
      <div onClick={() => onChange(DEFAULT_TIMEFRAME)}>{text.relative}</div>
      <div onClick={() => onChange(getDefaultAbsoluteTime())}>
        {text.absolute}
      </div>
      <Label>{text.label}</Label>
      {typeof value === 'string' ? (
        <RelativeTime onChange={onChange} {...convertRelativeTime(value)} />
      ) : (
        <AbsoluteTime id={id} {...value} onChange={onChange} />
      )}
    </>
  );
};

export default Timeframe;
