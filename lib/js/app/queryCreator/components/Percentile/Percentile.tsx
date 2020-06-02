import React, { FC, useEffect, useCallback } from 'react';
import { Label, Input } from '@keen.io/ui-core';

import text from './text.json';

import { MAX_PERCENTILE } from './constants';

type Props = {
  /** Percentile value */
  value?: number;
  /** Reset value event handler */
  onReset: () => void;
  /** Change value event handler */
  onChange: (value?: number) => void;
};

const Percentile: FC<Props> = ({ value, onReset, onChange }) => {
  useEffect(() => {
    return () => onReset();
  }, []);

  const changeHandler = useCallback(
    (eventValue) => {
      if (eventValue) {
        const percentile = parseInt(eventValue);
        onChange(percentile > MAX_PERCENTILE ? MAX_PERCENTILE : percentile);
      } else {
        onReset();
      }
    },
    [onChange, onReset]
  );

  return (
    <>
      <Label>{text.label}</Label>
      <Input
        type="number"
        variant="solid"
        value={value}
        placeholder={text.placeholder}
        onChange={(e) => changeHandler(e.target.value)}
      />
    </>
  );
};

export default Percentile;
