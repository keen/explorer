import React, { FC, useMemo } from 'react';
import { Label, Select } from '@keen.io/ui-core';

import text from './text.json';

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
    <div data-testid="supported-interval">
      <>
        <Label htmlFor="interval">{text.label}</Label>
        <Select
          inputId="interval"
          placeholder={text.placeholder}
          onChange={({ value }: { label: string; value: string }) => {
            onChange(value);
          }}
          value={interval ? { label: interval, value: interval } : null}
          variant="solid"
          options={options}
        />
      </>
    </div>
  );
};

export default SupportedInterval;
