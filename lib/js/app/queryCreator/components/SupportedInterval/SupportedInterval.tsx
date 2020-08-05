import React, { FC, useMemo } from 'react';

import { Container, IntervalButton } from './SupportedInterval.styles';

import { INTERVALS } from './constants';

type Props = {
  /** Supported interval */
  interval?: string;
  /** Change event handler */
  onChange: (interval: string) => void;
};

const SupportedInterval: FC<Props> = ({ interval, onChange }) => {
  const options = useMemo(
    () =>
      INTERVALS.map((name) => ({
        label: name,
        value: name,
      })),
    []
  );

  return (
    <Container data-testid="supported-interval">
      {options.map((option: { label: string; value: string }) => (
        <IntervalButton
          key={option.value}
          isActive={interval === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </IntervalButton>
      ))}
    </Container>
  );
};

export default SupportedInterval;
