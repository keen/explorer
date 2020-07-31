import React, {
  FC,
  useMemo,
  useReducer,
  useEffect,
  useState,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';

import { Button, ActionButton } from '@keen.io/ui-core';

import FiltersContext from './FiltersContext';
import { Filter } from './components';

import { addFilter, removeFilter, updateFilter, resetFilters } from './actions';
import { getCollectionSchema } from '../../modules/events';

import { useSearch } from '../../hooks';

import { filtersReducer } from './reducer';
import { createTree } from '../../utils/createTree';

import {
  DATA_TYPES,
  SCHEMA_PROPS,
  DEFAULT_TIMEFRAME_ABSOLUTE_VALUE,
} from './constants';
import {
  convertFilters,
  getPropertyType,
  convertDateToString,
  isStateValid,
  getOperatorOptions,
} from './utils';

import {
  AppState,
  PropertyType,
  Operator,
  Filter as FilterType,
} from '../../types';
import { SchemaProp } from './types';

import text from './text.json';

type Props = {
  /** Collection name */
  collection: string;
  /** Filters */
  filters: FilterType[];
  /** Onchange handler */
  onChange: (filters: FilterType[]) => void;
};

const dataTypes = Object.keys(DATA_TYPES).map((item) => ({
  label: DATA_TYPES[item],
  value: DATA_TYPES[item],
}));

const Filters: FC<Props> = ({ collection, filters, onChange }) => {
  const [searchPropertiesPhrase, setSearchPhrase] = useState(null);
  const [expandTree, setTreeExpand] = useState(false);
  const expandTrigger = useRef(null);

  const {
    schema: collectionSchema,
    tree: schemaTree,
    list: schemaList,
  } = useSelector((state: AppState) => getCollectionSchema(state, collection));

  const [propertiesTree, setPropertiesTree] = useState(null);

  const { searchHandler } = useSearch<{
    path: string;
    type: string;
  }>(
    schemaList,
    (searchResult, phrase) => {
      if (expandTrigger.current) clearTimeout(expandTrigger.current);
      if (phrase) {
        const searchTree = {};
        searchResult.forEach(({ path, type }) => {
          searchTree[path] = type;
        });
        setSearchPhrase(phrase);
        setPropertiesTree(createTree(searchTree));

        expandTrigger.current = setTimeout(() => {
          setTreeExpand(true);
        }, 300);
      } else {
        setTreeExpand(false);
        setPropertiesTree(null);
      }
    },
    {
      keys: ['path', 'type'],
      threshold: 0.4,
    }
  );

  const [state, filtersDispatcher] = useReducer(filtersReducer, filters);

  useEffect(() => {
    filters.map((filter, idx) => {
      if (!filter?.propertyType) {
        const type = getPropertyType(filter);
        if (type?.value)
          filtersDispatcher(updateFilter(idx, { propertyType: type.value }));
      }
    });
  }, [filters]);

  const setDefaults = (idx: number, type: PropertyType, value?: any) => {
    if (type === 'Null')
      filtersDispatcher(updateFilter(idx, { propertyValue: 'Null' }));
    if (type === 'Datetime') {
      const date = value || DEFAULT_TIMEFRAME_ABSOLUTE_VALUE;
      filtersDispatcher(
        updateFilter(idx, { propertyValue: convertDateToString(date) })
      );
    }
    if (type === 'Geo') {
      filtersDispatcher(updateFilter(idx, { operator: 'within' }));
    }
  };

  return (
    <>
      <FiltersContext.Provider value={{ expandTree, searchPropertiesPhrase }}>
        {state.map((filter, idx) => (
          <Filter
            key={idx}
            filter={filter}
            properties={propertiesTree ? propertiesTree : schemaTree}
            onSearchProperties={searchHandler}
            onRemove={() => filtersDispatcher(removeFilter(idx))}
            onChange={(filter) => {
              setSearchPhrase(null);
              setPropertiesTree(schemaTree);
              filtersDispatcher(updateFilter(idx, filter));
            }}
          />
        ))}
      </FiltersContext.Provider>

      <ActionButton
        action="create"
        isDisabled={!collection}
        onClick={() => filtersDispatcher(addFilter())}
      />

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
        onClick={() => onChange(convertFilters(state))}
      >
        {text.done}
      </Button>
      {!isStateValid(state) && `Please provide data for empty fields`}
    </>
  );
};

export default Filters;
