import React, { FC, useCallback, useMemo } from 'react';
import { Select, Input } from '@keen.io/ui-core';

import text from './text.json';

import { RELATIVITY_OPTIONS, TIME_UNITS } from './constants';

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
  const changeValueHandler = useCallback(
    (eventValue) => {
      let updatedValue = 0;
      if (eventValue) {
        updatedValue = parseInt(eventValue);
      }
      onChange(`${relativity}_${updatedValue}_${units}`);
    },
    [onChange]
  );

  const unitsOptions = useMemo(
    () =>
      TIME_UNITS.map((unit) => ({
        label: unit,
        value: unit,
      })),
    []
  );

  return (
    <div>
      <Select
        onChange={({ value: updatedRelativity }: { value: string }) =>
          onChange(`${updatedRelativity}_${value}_${units}`)
        }
        placeholder={text.relativityPlaceholder}
        variant="solid"
        options={RELATIVITY_OPTIONS}
        value={{ label: relativity, value: relativity }}
      />
      <Input
        type="number"
        value={value}
        variant="solid"
        onChange={(e) => changeValueHandler(e.target.value)}
      />
      <Select
        onChange={({ value: updatedUnits }: { value: string }) =>
          onChange(`${relativity}_${value}_${updatedUnits}`)
        }
        placeholder={text.unitsPlaceholder}
        variant="solid"
        options={unitsOptions}
        value={{ label: units, value: units }}
      />
      <div>
        The last
        {value}
        {units}
        {relativity === 'this' ? 'including' : 'excluding'}
        the current day
      </div>
    </div>
  );
};

export default RelativeTime;
