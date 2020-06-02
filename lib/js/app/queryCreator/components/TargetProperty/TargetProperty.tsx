import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Select } from '@keen.io/ui-core';

import { getCollectionSchema } from '../../modules/events';
import { getTargetProperty, selectTargetProperty } from '../../modules/query';

import text from './text.json';

import { AppState } from '../../types';

type Props = {
  /** Events collection identifer */
  collection: string;
};

const TargetProperty: FC<Props> = ({ collection }) => {
  const dispatch = useDispatch();
  const collectionSchema = useSelector((state: AppState) =>
    getCollectionSchema(state, collection)
  );
  const targetProperty = useSelector(getTargetProperty);

  const options = useMemo(() => {
    if (collectionSchema) {
      return Object.keys(collectionSchema).map((propertyName) => ({
        label: propertyName,
        value: propertyName,
      }));
    }

    return [];
  }, [collectionSchema]);

  useEffect(() => {
    if (targetProperty) {
      dispatch(selectTargetProperty(null));
    }

    return () => dispatch(selectTargetProperty(null));
  }, [collection]);

  const currentProperty = targetProperty
    ? { label: targetProperty, value: targetProperty }
    : null;

  return (
    <>
      <Label>{text.label}</Label>
      <Select
        variant="solid"
        placeholder={text.placeholder}
        onChange={({ value }: { value: string }) =>
          dispatch(selectTargetProperty(value))
        }
        value={currentProperty}
        options={options}
      />
    </>
  );
};

export default TargetProperty;
