import React, { FC, useCallback, useMemo } from 'react';
import { Input, Label, Select } from '@keen.io/ui-core';

import { parseCustomInterval } from './utils/parseCustomInterval';
import text from './text.json';

import { MINIMUM_VALUE, TIME_UNITS, EVERY } from './constants';

type Props = {
  /** Custom interval */
  interval: string;
  /** Change event handler */
  onChange: (interval: string) => void;
};

const CustomInterval: FC<Props> = ({ interval, onChange }) => {
  const { value, timeUnit } = parseCustomInterval(interval);
  const options = useMemo(
    () =>
      TIME_UNITS.map((unit) => ({
        label: unit,
        value: unit,
      })),
    []
  );
  
  const valueChangeHandler = useCallback(
    (eventValue) => {
      if (eventValue) {
        const intervalValue = parseInt(eventValue);
        onChange(`${EVERY}_${intervalValue}_${timeUnit}`);
      } else {
        onChange(`${EVERY}_${MINIMUM_VALUE}_${timeUnit}`);
      }
    },
    [value, timeUnit]
  );

  return (
    <div>
      <div>{text.mainLabel}</div>
      <Input
        type="number"
        variant="solid"
        value={value}
        placeholder={text.valuePlaceholder}
        onChange={(e) => valueChangeHandler(e.target.value)}
      />
      <Label htmlFor="interval-unit">{text.unitLabel}</Label>
      <Select
        inputId="interval-unit"
        placeholder={text.unitPlaceholder}
        onChange={({ value: unitValue }: { label: string; value: string }) => {
          onChange(`${EVERY}_${value}_${unitValue}`);
        }}
        value={timeUnit ? { label: timeUnit, value: timeUnit } : null}
        variant="solid"
        options={options}
      />
    </div>
  );
};

export default CustomInterval;
