import React, { FC } from 'react';

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
    <div>
      The last
      {value}
      {units}
      {relativity === 'this' ? 'including' : 'excluding'}
      the current day
    </div>
  );
};

export default RelativeTimeLabel;
