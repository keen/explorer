import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Label, Select } from '@keen.io/ui-core';

import { getEventsCollections } from '../../modules/events';

import text from './text.json';

type Props = {
  /** Collection identifer */
  collection: string;
  /** Collection change event handler */
  onChange: (collection: string) => void;
};

const EventCollection: FC<Props> = ({ collection, onChange }) => {
  const collections = useSelector(getEventsCollections);
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
        value={collection ? { label: collection, value: collection } : null}
        options={options}
      />
    </>
  );
};

export default EventCollection;
