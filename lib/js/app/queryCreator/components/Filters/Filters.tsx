import React, { FC, useEffect, useRef, useState, useMemo, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import React, { FC, useEffect, useRef, useMemo, useReducer } from 'react';
import shallowEqual from 'shallowequal';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'rc-time-picker';
import { Button, Select, Label, Input } from '@keen.io/ui-core';

import {
  addFilter,
  removeFilter,
  updateFilter,
  resetFilters,
  setFilters
} from './actions';

import { filtersReducer } from './reducer';

import { getCollectionSchema } from '../../modules/events';

import text from './text.json';

import { AppState, PropertyType, Operator, Filter } from '../../types';

import { DATA_TYPES, FILTER_OPERATORS, DEFAULT_TIMEFRAME_ABSOLUTE_VALUE } from './constants';

import { convertDateToString, convertValueToJson, getTypeFromValue, convertSchemaProp } from './utils';
import { SchemaProp } from './types';

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
  ); console.log('----- colllection schema', {collectionSchema});

  const options = useMemo(() => {
    if (collectionSchema) {
      return Object.keys(collectionSchema).map((propertyName) => ({
        label: propertyName,
        value: propertyName,
      }));
    }

    return [];
  }, [collectionSchema]);

  const [startFocus, setStartFocus] = useState(false);

  const dataTypes = Object.keys(DATA_TYPES).map(item => ({ label: DATA_TYPES[item], value: DATA_TYPES[item] }));

  const getOperatorOptions = (type?: PropertyType) => {
    if (!type) return FILTER_OPERATORS;

    return FILTER_OPERATORS.filter(operator => operator.dataTypes.includes(type));
  }

  const [state, filtersDispatcher] = useReducer(filtersReducer, []);

  const filtersRef = useRef(filters);

  useEffect(() => {
    console.log('---------------------------');
    const localFilters = state.filter((v) => v !== null);
    console.log({filters}, {localFilters}, filtersRef.current, !shallowEqual(filters, filtersRef.current), !shallowEqual(filters, localFilters));
    if (
      !shallowEqual(filters, filtersRef.current) &&
      !shallowEqual(filters, localFilters)
    ) {
      filtersDispatcher(setFilters(filters));
    }
    filtersRef.current = filters;
  }, [filters])

  const renderFilterValue = (idx: number, filter:Filter) => {
    if (filter?.propertyType === DATA_TYPES['num']) {
      return (
        <Input
          type="number"
          variant="solid"
          placeholder="Value"
          value={filter?.propertyValue || ''}
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
          value={filter?.propertyValue ? {label: filter.propertyValue, value: filter.propertyValue} : null}
        />
      );
    }

    if (filter?.propertyType === DATA_TYPES['null']) {
      return (
      <Input
        disabled
        variant="solid"
        value={''}
      />
      );
    }

    if (filter?.propertyType === DATA_TYPES['datetime']) {
      const startDate = moment.utc(filter?.propertyValue || DEFAULT_TIMEFRAME_ABSOLUTE_VALUE);
      return (
        <>
        <SingleDatePicker
          date={startDate}
          onDateChange={(value) => {
            const valueConverted = convertDateToString(value);
            filtersDispatcher(updateFilter(idx, { propertyValue: valueConverted }));
          }}
          focused={startFocus}
          onFocusChange={({ focused }) => setStartFocus(focused)}
          isOutsideRange={() => false}
          id={`date-picker-${idx}`}
          numberOfMonths={1}
          displayFormat={'YYYY-MM-DD'}
        />
        <TimePicker
          use12Hours
          showSecond={false}
          value={startDate}
          onChange={(value) => {
            const valueConverted = convertDateToString(value);
            filtersDispatcher(updateFilter(idx, { propertyValue: valueConverted }));
          }}
        />
      </>
      );
    }

    if (filter?.operator === 'within') {
      let newPropertyValue = {
        coordinates: [undefined, undefined],
        maxDistanceMiles: undefined,
      };
      if (filter?.propertyValue) {
        newPropertyValue = {
          ...filter.propertyValue
        }
      }
      const [ long = '', lat = '' ] = newPropertyValue?.coordinates;
      const radius = newPropertyValue?.maxDistanceMiles || '';
      return (
        <>
        <Input
          type="number"
          variant="solid"
          placeholder="Longitude"
          value={long}
          onChange={(e) => filtersDispatcher(updateFilter(idx, { propertyValue: { coordinates: [e.target.value, lat], maxDistanceMiles: radius }}))}
        />
        <Input
          type="number"
          variant="solid"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => filtersDispatcher(updateFilter(idx, { propertyValue: { coordinates: [long, e.target.value], maxDistanceMiles: radius }}))}
        />
        <Input
          type="number"
          variant="solid"
          placeholder="Radius [in miles]"
          value={radius}
          onChange={(e) => filtersDispatcher(updateFilter(idx, { propertyValue: { coordinates: [long, lat], maxDistanceMiles: e.target.value }}))}
        />
        </>
      )
    }

    return (
      <Input
        variant="solid"
        placeholder="Value"
        value={filter?.propertyValue || ''}
        onChange={(e) => filtersDispatcher(updateFilter(idx, { propertyValue: e.target.value }))}
      />
    );
  }

  const getPropertyType = (item: Filter) => {
    const propertyType = item?.propertyType || getTypeFromValue(item);
    return propertyType ? { label: propertyType, value: propertyType } : null;
  }

  console.log({state});
  state.forEach(item => item?.propertyValue && console.log(convertValueToJson(item.propertyValue)));
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
              const schemaProp = collectionSchema[value];
              if (schemaProp) filtersDispatcher(updateFilter(idx, { propertyType: convertSchemaProp(schemaProp as SchemaProp) as PropertyType })); 
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
    </>
  );
};

export default Filters;
