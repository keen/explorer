import React, { FC, useEffect, useCallback } from 'react';

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
    <div className="percentile">
      <div className="label-main">Percentile value</div>
      <input
        type="number"
        className="input-text"
        value={value}
        placeholder="Ex. 33"
        onChange={(e) => changeHandler(e.target.value)}
      />
    </div>
  );
};

export default Percentile;
