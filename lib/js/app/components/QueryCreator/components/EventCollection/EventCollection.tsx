import React, { FC, useMemo } from 'react';
import { Label, Select } from '@keen.io/ui-core';

import text from './text.json';

type Props = {
  /** */
  collection: string;
  /** Collections names */
  collections: string[];
  /** Collection change event handler */
  onChange: (collection: string) => void;
};

const EventCollection: FC<Props> = ({ collection, collections, onChange }) => {
  const options = useMemo(
    () =>
      collections.map((name) => ({
        label: name,
        value: name,
      })),
    [collections]
  );

  return (
    <>
      <Label>{text.label}</Label>
      <Select
        variant="solid"
        placeholder={text.placeholder}
        onChange={({ value }: { value: string }) => onChange(value)}
        value={{ label: collection, value: collection }}
        options={options}
      />
    </>
  );
};

export default EventCollection;
