import React, { FC, useEffect, useRef, useMemo, useReducer } from 'react';
import { useSelector } from 'react-redux';
import shallowEqual from 'shallowequal';
import { Button, Select, Input } from '@keen.io/ui-core';
import { DatePicker } from './DatePicker';
import { GeoCoordinates } from './GeoCoordinates';

import {
  addFilter,
  removeFilter,
  updateFilter,
  resetFilters,
  setFilters
} from './actions';
import { getCollectionSchema } from '../../modules/events';

import { filtersReducer } from './reducer';

import { DATA_TYPES, FILTER_OPERATORS, DEFAULT_TIMEFRAME_ABSOLUTE_VALUE } from './constants';
import { convertFilters, getTypeFromValue, convertSchemaProp } from './utils';

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

const Filters: FC<Props> = ({ collection, filters }) => {
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

  const dataTypes = Object.keys(DATA_TYPES).map(item => ({ label: DATA_TYPES[item], value: DATA_TYPES[item] }));

  const getOperatorOptions = (type?: PropertyType) => {
    if (!type) return FILTER_OPERATORS;

    return FILTER_OPERATORS.filter(operator => operator.dataTypes.includes(type));
  }

  const [state, filtersDispatcher] = useReducer(filtersReducer, []);
  const stateRef = useRef(state);

  const filtersRef = useRef(filters);

  useEffect(() => {
    const localFilters = state.filter((v) => v !== null);
    if (
      !shallowEqual(filters, filtersRef.current) &&
      !shallowEqual(filters, localFilters)
    ) {
      filtersDispatcher(setFilters(filters));
    }
    filtersRef.current = filters;
  }, [filters])

  useEffect(() => {
    if (!shallowEqual(state, stateRef.current)) {
      stateRef.current = state; console.log('use state');
    }
  }, [state])

  const getInputValue = (filter: Filter) => {
    if (filter?.propertyValue && typeof filter?.propertyValue === 'string') return filter.propertyValue;
    return '';
  };

  const getSelectValue = (options: any, filter: Filter) => {
    if (filter?.propertyValue) {
      const value = options.filter(option => option.value === filter.propertyValue);
      return value.length ? { label: filter.propertyValue, value: filter.propertyValue } : null;
    }
    return null;
  }

  const renderFilterValue = (idx: number, filter:Filter) => {
    if (filter?.propertyType === DATA_TYPES['num']) {
      return (
        <Input
          type="number"
          variant="solid"
          placeholder="Value"
          value={getInputValue(filter)}
          onChange={(e) => filtersDispatcher(updateFilter(idx, { propertyValue: e.target.value }))}
        />
      );
    }

    if (filter?.propertyType === DATA_TYPES['bool']) {
      const BooleanOptions = ['true', 'false'].map((item) => ({
        label: item,
        value: item,
      }));

      return (
        <Select
          variant="solid"
          placeholder={'Select property type'}
          options={BooleanOptions}
          onChange={({ value }: { value: string }) => filtersDispatcher(updateFilter(idx, { propertyValue: value }))}
          value={getSelectValue(BooleanOptions, filter)}
        />
      );
    }

    if (filter?.propertyType === DATA_TYPES['null']) {
      // filtersDispatcher(updateFilter(idx, { propertyValue: null }));
      return (
      <Input
        disabled
        variant="solid"
        value={'null'}
      />
      );
    }

    if (filter?.propertyType === DATA_TYPES['datetime']) {
      const initialDate = filter?.propertyValue || DEFAULT_TIMEFRAME_ABSOLUTE_VALUE
      // filtersDispatcher(updateFilter(idx, { propertyValue: initialDate }));
      return (
        <DatePicker
          idx={idx}
          initialDate={initialDate}
          onChange={
            (idx, value) => filtersDispatcher(updateFilter(idx, { propertyValue: value }))
          }
        />
      )
    }

    if (filter?.operator === 'within') {
      // filtersDispatcher(updateFilter(idx, { propertyValue: '' }));
      return (
        <GeoCoordinates
          idx={idx}
          filter={filter}
          onChange={(idx, value) => filtersDispatcher(updateFilter(idx, {propertyValue: value}))}
        />
      )
    }

    return (
      <Input
        variant="solid"
        placeholder="Value"
        value={getInputValue(filter)}
        onChange={(e) => filtersDispatcher(updateFilter(idx, { propertyValue: e.target.value }))}
      />
    );
  }

  const getPropertyType = (item: Filter) => {
    const propertyType = item?.propertyType || getTypeFromValue(item);
    return propertyType ? { label: propertyType, value: propertyType } : null;
  }

  console.log({state});
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
              if (schemaProp) filtersDispatcher(updateFilter(idx, { propertyType: convertSchemaProp(schemaProp) as PropertyType }));
            }
          }
          value={item?.propertyName ? {label: item.propertyName, value: item.propertyName} : null}
        />
        <Select
          variant="solid"
          placeholder={'Select property type'}
          options={dataTypes}
          onChange={({ value }: { value: PropertyType }) => {
            filtersDispatcher(updateFilter(idx, { propertyType: value }));
            // if (value === 'Null') filtersDispatcher(updateFilter(idx, { propertyValue: 'Null' }));
            // if (value === 'Datetime') filtersDispatcher(updateFilter(idx, { propertyValue:  item?.propertyValue || DEFAULT_TIMEFRAME_ABSOLUTE_VALUE}));
            if (item?.operator) {
              // const type = DATA_TYPES[value];
              const operatorOptions = getOperatorOptions(value);
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
          options={item?.propertyType? getOperatorOptions(DATA_TYPES[item.propertyType]) : getOperatorOptions()}
          onChange={({ value }: { value: Operator }) => filtersDispatcher(updateFilter(idx, { operator: value }))
          }
          value={item?.operator ? {label: item.operator, value: item.operator} : null}
        />
        {renderFilterValue(idx, item)}
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
        onClick={() => console.log(convertFilters(state))}>
          {text.done}
        </Button>
    </>
  );
};

export default Filters;
