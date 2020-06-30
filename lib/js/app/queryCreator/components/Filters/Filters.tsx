import React, { FC, useEffect, useRef, useMemo, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import React, { FC, useEffect, useRef, useMemo, useReducer } from 'react';
import { Button, Select, Label } from '@keen.io/ui-core';

import {
  addFilter,
  removeFilter,
  updateFilter,
  resetFilters
} from './actions';

import { filtersReducer } from './reducer';

import { getCollectionSchema } from '../../modules/events';

import text from './text.json';

import { AppState } from '../../types';

import { DATA_TYPES, FILTER_OPERATORS } from './constants';

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

  const dataTypes = Object.keys(DATA_TYPES).map(item => ({ label: DATA_TYPES[item], value: item }));
  // const filterOperators = 

  const [state, groupDispatcher] = useReducer(filtersReducer, []);
  console.log({state});
  return (
    <>
    {state.map((item, idx) => (
      <div key={idx}>
        <Select
          variant="solid"
          placeholder={'collection'}
          options={options}
          onChange={({ value }: { value: string }) => console.log(value)
            // groupDispatcher(selectGroupProperty(idx, value))
          }
          value={null}
          //  value={property ? { label: property, value: property } : null}
        />
        <Select
          variant="solid"
          placeholder={'type'}
          options={dataTypes}
          onChange={({ value }: { value: string }) => console.log(value)
            // groupDispatcher(selectGroupProperty(idx, value))
          }
          value={null}
          //  value={property ? { label: property, value: property } : null}
        />
        <Select
          variant="solid"
          placeholder={'operators'}
          options={FILTER_OPERATORS}
          onChange={({ value }: { value: string }) => console.log(value)
            // groupDispatcher(selectGroupProperty(idx, value))
          }
          value={null}
          //  value={property ? { label: property, value: property } : null}
        />
      </div>
    ))}
      <Button
        variant="secondary"
        style="outline"
        onClick={() => groupDispatcher(addFilter())}
      >
        {text.addFilter}
      </Button>
      <Button
        variant="secondary"
        style="outline"
        onClick={() => groupDispatcher(resetFilters())}
      >
        {text.resetFilters}
      </Button>
    </>
  );
};

export default Filters;
