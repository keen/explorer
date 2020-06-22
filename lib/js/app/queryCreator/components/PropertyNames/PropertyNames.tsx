import React, { FC, useMemo } from 'react';
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

const PropertyNames: FC<Props> = ({ collection, onSelect }) => {
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

  const currentProperties = useMemo(() => {
    if (propertyNames) {
      return propertyNames.map((property) => ({
        label: property,
        value: property,
      }));
    }

    return [];
  }, [propertyNames]);

  console.log(collection, options, currentProperties, propertyNames);

  return (
    <>
      <Label>{text.label}</Label>
      <Select
        isMulti
        onChange={(values: { label: string; value: string }[]) => {
          if (values) {
            const selectedProperties = values.map(({ value }) => value);
            onSelect(selectedProperties);
          } else {
            onSelect(undefined);
          }
        }}
        value={currentProperties}
        options={options}
      />
    </>
  );
};

export default PropertyNames;
