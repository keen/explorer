import React, { FC } from 'react';

import { parseCustomInterval } from './utils/parseCustomInterval';

import { Container } from './CustomInterval.styles';

import TimePeriod from '../TimePeriod';

import text from './text.json';

import { EVERY } from './constants';

type Props = {
  /** Custom interval */
  interval: string;
  /** Change event handler */
  onChange: (interval: string) => void;
};

const CustomInterval: FC<Props> = ({ interval, onChange }) => {
  const { value, timeUnit } = parseCustomInterval(interval);

  return (
    <Container data-testid="custom-interval">
      <TimePeriod
        label={text.mainLabel}
        unitsPlaceholder={text.unitPlaceholder}
        relativity={EVERY}
        value={value}
        units={timeUnit}
        onChange={(timeframe) => onChange(timeframe)}
      />
    </Container>
  );
};

export default CustomInterval;
