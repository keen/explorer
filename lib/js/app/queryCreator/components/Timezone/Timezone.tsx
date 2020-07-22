import React, { FC, useMemo } from 'react';
import { Select, Label } from '@keen.io/ui-core';

import { TIMEZONES } from './constants';

import text from './text.json';

import { Timezones } from '../../types';

type Props = {
  /** Timezone value */
  timezone?: Timezones;
  /** Change event handler */
  onChange: (timezone: Timezones) => void;
};

const Timezone: FC<Props> = ({ timezone, onChange }) => {
  const options = useMemo(
    () =>
      TIMEZONES.map(({ name }) => ({
        label: name,
        value: name,
      })),
    []
  );

  return (
    <div data-testid="timezone">
      <Label htmlFor="timezone">{text.label}</Label>
      <Select
        variant="solid"
        inputId="timezone"
        placeholder={text.placeholder}
        onChange={({ value }: { value: Timezones }) => onChange(value)}
        value={timezone ? { label: timezone, value: timezone } : null}
        options={options}
      />
    </div>
  );
};

export default Timezone;
