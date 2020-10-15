import React, { FC } from 'react';

import { Container, IncludesToday } from './RelativeTimeLabel.styles';

import { getInterval } from '../../utils';
import text from './text.json';

type Props = {
  /** Time relativity */
  relativity: string;
  /** Time value */
  value: number;
  /** Timeframe units */
  units: string;
};

const RelativeTimeLabel: FC<Props> = ({ relativity, value, units }) => {
  const interval = getInterval(units);
  return (
    <Container>
      <span>
        {text.label} {value} {units}
      </span>{' '}
      {relativity === 'this' && (
        <IncludesToday>
          {interval === 'day'
            ? text.todayIncludes
            : `(${text.relativityTitle} ${interval})`}
        </IncludesToday>
      )}
    </Container>
  );
};

export default RelativeTimeLabel;
