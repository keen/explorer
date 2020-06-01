import React, { FC, useMemo } from 'react';
import { Select, Label } from '@keen.io/ui-core';
import { FieldGroup } from '@keen.io/forms';

import { createOptions } from './utils';
import text from './text.json';

import { Analysis as AnalysisType } from '../../../../types';

type Props = {
  /** Current analysis */
  analysis: AnalysisType;
  /** Analysis change handler */
  onChange: (analysis: AnalysisType) => void;
};

const Analysis: FC<Props> = ({ analysis, onChange }) => {
  const options = useMemo(() => createOptions(), []);

  return (
    <FieldGroup>
      <Label>{text.label}</Label>
      <Select
        variant="solid"
        placeholder={text.placeholder}
        onChange={({ value }: { value: AnalysisType }) => onChange(value)}
        value={{ label: analysis, value: analysis }}
        options={options}
      />
    </FieldGroup>
  );
};

export default Analysis;
