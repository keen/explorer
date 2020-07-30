import React, { FC } from 'react';

import { Container, IncludesToday } from './RelativeTimeLabel.styles';
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
  return (
    <Container>
      <span>
        {text.label} {value} {units}
      </span>{' '}
      {relativity === 'this' && (
        <IncludesToday>{text.todayIncludes}</IncludesToday>
      )}
    </Container>
  );
};

export default RelativeTimeLabel;
