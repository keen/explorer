import React,{ FC, useMemo } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import shallowEqual from 'shallowequal';
import { Label } from '@keen.io/ui-core';

import { getCollectionSchema } from '../../modules/events';
import { getExtractionPropertyNames } from '../../modules/query';

import text from './text.json';

import { AppState } from '../../types';

type Props = {
  /** Events collection identifer */
  collection: string;
  /** Properties select event handler */
  onSelect: (properties?: string[]) => void;
};

const PropertyNames: FC<Props> = ({
  collection,
  onSelect,
}) => {
  const collectionSchema = useSelector((state: AppState) =>
    getCollectionSchema(state, collection)
  );

  const propertyNames: string[] = useSelector((state: AppState) => {
    const properties = getExtractionPropertyNames(state);
    if (properties) {
      if (Array.isArray(properties)) return properties;
      if (typeof properties === 'string') return [properties];
    }
    return [];
  }, shallowEqual);

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
    <div>
      <Label>{text.label}</Label>
      <Select
        isMulti
        onChange={(values) => {
          if (values) {
            const selectedProperties = values.map(({ value }) => value);
            onSelect(selectedProperties);
          } else {
            onSelect(undefined);
          }
        }}
        value={propertyNames ? propertyNames.map((name) => ({
          label: name,
          value: name
        })): null}
        options={options}
      />
    </div>
  );
};

export default PropertyNames;
