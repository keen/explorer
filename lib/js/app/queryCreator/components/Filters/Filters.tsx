import React, { FC, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import FiltersContext from './FiltersContext';
import { Filter } from './components';

import { getCollectionSchema } from '../../modules/events';
import { useSearch } from '../../hooks';

import { createTree } from '../../utils/createTree';
import { setOperator, setDefaultValue } from './utils';

import { SEARCH_EXPAND_TIME } from './constants';
import { SCHEMA_PROPS } from '../../constants';

import { AppState, Filter as FilterType } from '../../types';

type Props = {
  /** Collection name */
  collection: string;
  /** Filters */
  filters: FilterType[];
  /** Reset event handler */
  onReset: () => void;
  /** Remove event handler */
  onRemove: (idx: number) => void;
  /** On change event handler */
  onChange: (idx: number, filters: FilterType) => void;
};

const Filters: FC<Props> = ({
  collection,
  filters,
  onRemove,
  onReset,
  onChange,
}) => {
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
        }, SEARCH_EXPAND_TIME);
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

  useEffect(() => {
    return () => {
      onReset();
    };
  }, []);

  return (
    <FiltersContext.Provider
      value={{ expandTree, searchPropertiesPhrase, schema: collectionSchema }}
    >
      {filters.map((filter, idx) => (
        <Filter
          id={`filter_${idx}`}
          key={idx}
          filter={filter}
          properties={propertiesTree ? propertiesTree : schemaTree}
          onSearchProperties={searchHandler}
          onPropertyChange={(propertyName) => {
            const schemaType = collectionSchema[propertyName];
            const inferredType = SCHEMA_PROPS[schemaType];
            const operator = setOperator(inferredType, filter.operator);

            onChange(idx, {
              propertyName,
              propertyType: inferredType,
              operator,
              propertyValue: setDefaultValue(inferredType, operator),
            });

            setSearchPhrase(null);
            setPropertiesTree(schemaTree);
          }}
          onRemove={() => onRemove(idx)}
          onChange={(filter) => onChange(idx, filter)}
        />
      ))}
    </FiltersContext.Provider>
  );
};

export default Filters;
