import React, { FC } from 'react';
import { Checkbox } from '@keen.io/ui-core';

type Props = {
  /** Filter label */
  label: string;
  /** Filter identifier */
  id: string;
  /** Active state indicator */
  isActive?: boolean;
  /** Change event handler */
  onChange: (isActive: boolean) => void;
};

const FilterItem: FC<Props> = ({ label, id, onChange, isActive }) => (
  <div>
    <label htmlFor={id}>
      {label}
      <Checkbox
        id={id}
        type="secondary"
        checked={isActive}
        onChange={() => onChange(!isActive)}
      />
    </label>
  </div>
);

export default FilterItem;
