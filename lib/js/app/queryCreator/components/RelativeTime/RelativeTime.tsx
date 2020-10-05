import React, { FC } from 'react';
import { Checkbox } from '@keen.io/ui-core';

import { RelativityContainer, CheckboxLabel } from './RelativeTime.styles';

import TimePeriod from '../TimePeriod';

import Title from '../Title';
import text from './text.json';

import { getInterval } from '../../utils';

import { THIS_RELATIVITY, PREVIOUS_RELATIVITY } from './constants';

type Props = {
  /** Time relativity */
  relativity: string;
  /** Time value */
  value: number;
  /** Timeframe units */
  units: string;
  /** Relative timeframe change event handler */
  onChange: (timeframe: string) => void;
};

const RelativeTime: FC<Props> = ({ relativity, value, units, onChange }) => {
  const interval = getInterval(units);
  return (
    <div data-testid="relative-time">
      <TimePeriod
        label={text.timeLabel}
        unitsPlaceholder={text.unitsPlaceholder}
        relativity={relativity}
        value={value}
        units={units}
        onChange={onChange}
      />
      <RelativityContainer
        onClick={() => {
          const updatedRelativity =
            relativity === THIS_RELATIVITY
              ? PREVIOUS_RELATIVITY
              : THIS_RELATIVITY;
          onChange(`${updatedRelativity}_${value}_${units}`);
        }}
      >
        <Checkbox id="relativity" checked={relativity === THIS_RELATIVITY} />
        <CheckboxLabel>
          <Title>
            {interval === 'day'
              ? text.relativityTitleForToday
              : `${text.relativityTitle} ${interval}`}
          </Title>
        </CheckboxLabel>
      </RelativityContainer>
    </div>
  );
};

export default RelativeTime;
