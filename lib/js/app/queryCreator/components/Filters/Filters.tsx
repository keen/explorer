import React, { FC, useEffect, useMemo, useReducer } from 'react';
import { useSelector } from 'react-redux';

import { Button, Select } from '@keen.io/ui-core';
import FilterValue from './FilterValue';

import {
  addFilter,
  removeFilter,
  updateFilter,
  resetFilters,
  setFilters
} from './actions';
import { getCollectionSchema } from '../../modules/events';

import { filtersReducer } from './reducer';

import { DATA_TYPES, SCHEMA_PROPS, DEFAULT_TIMEFRAME_ABSOLUTE_VALUE } from './constants';
import { convertFilters, getPropertyType, convertDateToString, isStateValid, getOperatorOptions } from './utils';

import { AppState, PropertyType, Operator, Filter } from '../../types';
import { SchemaProp } from './types';

import text from './text.json';

type Props = {
  /** Collection name */
  collection: string;
  /** Filters */
  filters: Filter[];
  /** Onchange handler */
  onChange: (filters: Filter[]) => void;
};

const dataTypes = Object.keys(DATA_TYPES).map(item => ({ label: DATA_TYPES[item], value: DATA_TYPES[item] }));

const Filters: FC<Props> = ({ collection, filters, onChange }) => {
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

  const [state, filtersDispatcher] = useReducer(filtersReducer, []);
  useEffect(() => {
    if (filters.length) {
      filtersDispatcher(setFilters(filters));
    }
  }, [filters]);

  const setDefaults = (idx:number, type: PropertyType, value?: any ) => {
    if (type === 'Null') filtersDispatcher(updateFilter(idx, { propertyValue: 'Null' }));
    if (type === 'Datetime') {
      const date = value || DEFAULT_TIMEFRAME_ABSOLUTE_VALUE;
      filtersDispatcher(updateFilter(idx, { propertyValue: convertDateToString(date)}))
    }
    if (type === 'Geo') {
      filtersDispatcher(updateFilter(idx, { operator: 'within'}))
    }
  }

  return (
    <>
    {state.map((item, idx) => (
      <div key={idx}>
        <Select
          variant="solid"
          placeholder={'Select property name'}
          options={options}
          onChange={({ value }: { value: string }) => {
              filtersDispatcher(updateFilter(idx, { propertyName: value }));
              const schemaProp = collectionSchema[value] as SchemaProp;
              if (schemaProp) {
                const propertyType = SCHEMA_PROPS[schemaProp] as PropertyType;
                filtersDispatcher(updateFilter(idx, { propertyType }));
                setDefaults(idx, propertyType);
              }
            }
          }
          value={item?.propertyName ? {label: item.propertyName, value: item.propertyName} : null}
        />
        <Select
          variant="solid"
          placeholder={'Select property type'}
          options={dataTypes}
          onChange={({ type }: { type: PropertyType }) => {
            filtersDispatcher(updateFilter(idx, { propertyType: type }));
            setDefaults(idx, type, item?.propertyValue );
            
            if (item?.operator) {
              const operatorOptions = getOperatorOptions(type);
              const isOperatorAvailable = operatorOptions.some(option => option.value === item.operator);
              if (!isOperatorAvailable) {
                filtersDispatcher(updateFilter(idx, { operator: null }));
              }
            }
          }
          }
          value={getPropertyType(item)}
        />
        <Select
          variant="solid"
          placeholder={'Select operator'}
          options={getOperatorOptions(item?.propertyType)}
          onChange={({ value }: { value: Operator }) => filtersDispatcher(updateFilter(idx, { operator: value }))
          }
          value={item?.operator ? {label: item.operator, value: item.operator} : null}
        />
        <FilterValue
          idx={idx}
          filter={item}
          onChange={(idx, value) => filtersDispatcher(updateFilter(idx, { propertyValue: value }))}
        />
        <Button
          variant="danger"
          style="outline"
          onClick={() => filtersDispatcher(removeFilter(idx))}
        >
          {text.removeFilter}
        </Button>
      </div>
    ))}
      <Button
        variant="secondary"
        style="outline"
        onClick={() => filtersDispatcher(addFilter())}
      >
        {text.addFilter}
      </Button>
      <Button
        variant="secondary"
        style="outline"
        onClick={() => filtersDispatcher(resetFilters())}
      >
        {text.resetFilters}
      </Button>
      <Button
        variant="success"
        style="solid"
        isDisabled={!isStateValid(state)}
        onClick={() => onChange(convertFilters(state))}>
          {text.done}
        </Button>
        {!isStateValid(state) && `Please provide data for empty fields`}
    </>
  );
};

export default Filters;
