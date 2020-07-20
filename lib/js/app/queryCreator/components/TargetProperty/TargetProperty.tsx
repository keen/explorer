import React, { FC, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from './TargetProperty.styles';

import Dropdown from '../Dropdown';
import DropdownList from '../DropdownList';
import PropertyContainer from '../PropertyContainer';

import { useSearch } from '../../hooks';
import { getCollectionSchema } from '../../modules/events';
import { getTargetProperty, selectTargetProperty } from '../../modules/query';

import text from './text.json';

import { AppState } from '../../types';

type Props = {
  /** Events collection identifer */
  collection: string;
};

const TargetProperty: FC<Props> = ({ collection }) => {
  const [isOpen, setOpen] = useState(false);
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
        type: collectionSchema[propertyName],
      }));
    }

    return [];
  }, [collectionSchema]);
    const [propertiesList, setPropertiesList] = useState(options);

    const { searchHandler } = useSearch<{ label: string; value: string, type: string }>(
      options,
      (searchResult) => {
        setPropertiesList(searchResult);
      },
      {
        keys: ['value', 'type'],
        threshold: 0.4,
      }
    );

  useEffect(() => {
    if (
      collectionSchema &&
      !Object.keys(collectionSchema).includes(targetProperty)
    ) {
      dispatch(selectTargetProperty(null));
    }

    return () => dispatch(selectTargetProperty(null));
  }, [collection]);

  useEffect(() => {
    setPropertiesList(options);
  }, [options]);

  return (
    <Container>
      <PropertyContainer
        onClick={() => !isOpen && setOpen(true)}
        isActive={isOpen}
        propertyLabel={text.label}
        value={targetProperty}
        searchable
        onSearch={searchHandler}
        onDefocus={() => {
          setOpen(false);
        }}
      />
      <Dropdown isOpen={isOpen}>
        <DropdownList
          items={propertiesList}
          renderItem={({ label, type }) => (
            <>
              <div>{label}</div>
              <div>{type}</div>
            </>
          )}
          onClick={(_e, { value }) => {
            dispatch(selectTargetProperty(value));
          }}
        />
      </Dropdown>
    </Container>
  );
};

export default TargetProperty;
