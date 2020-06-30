import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
// import React, { FC, useEffect, useRef, useMemo, useReducer } from 'react';
import { Select, Label } from '@keen.io/ui-core';


import { getCollectionSchema } from '../../modules/events';

import text from './text.json';

import { AppState } from '../../types';

type Props = {
  /** Collection name */
  collection: string;
};

const Filters: FC<Props> = ({ collection }) => {
  const collectionSchema = useSelector((state: AppState) =>
  getCollectionSchema(state, collection)
);

const options = useMemo(() => {
  if (collectionSchema) {
    return Object.keys(collectionSchema).map((propertyName) => ({
      label: propertyName,
      value: propertyName,
    }));
  }

  return [];
}, [collectionSchema]);

  return (
    <>
      <Label>{text.filters}</Label>
      <Select
        variant="solid"
        placeholder={''}
        options={options}
        onChange={({ value }: { value: string }) => console.log(value)
          // groupDispatcher(selectGroupProperty(idx, value))
        }
        value={null}
        //  value={property ? { label: property, value: property } : null}
      />
    </>
  );
};

export default Filters;
