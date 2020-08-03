import React, { FC } from 'react';
// import { Select as SelectCore } from '@keen.io/ui-core';

import { StyledSelect } from './Select.styles';

type Props = {
  options: Record<string, any>[];
  placeholder: string;
  value: any;
  onChange: ({ value }: { value: string }) => void;
  inputId?: string;
};

const Select: FC<Props> = ({ options, placeholder, value, inputId, onChange }) => {
  return (
      <StyledSelect
        inputId={inputId}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        variant="solid"
        options={options}
      />
  );
};

export default Select;