import React, { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useSearch } from '@keen.io/react-hooks';

import { Operator } from './Filters.styles';

import FiltersContext from './FiltersContext';
import { Filter } from './components';
import Badge from '../Badge';

import { getCollectionSchema } from '../../modules/events';
import { SearchContext } from '../../contexts';

import { createTree } from '../../utils';
import { setOperator, setDefaultValue } from './utils';

import { AND_OPERATOR } from './constants';
import { SCHEMA_PROPS } from '../../constants';

import { AppState, Filter as FilterType } from '../../types';

const operatorMotion = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
};

type Props = {
  /** Collection name */
  collection: string;
  /** Filters */
  filters: FilterType[];
  /** Reset event handler */
  onReset?: () => void;
  /** Remove event handler */
  onRemove: (id: string) => void;
  /** On change event handler */
  onChange: (id: string, filters: FilterType) => void;
};

const FiltersComponent: FC<Props> = ({
  collection,
  filters,
  onRemove,
  onReset,
  onChange,
}) => {
  const [searchPropertiesPhrase, setSearchPhrase] = useState(null);
  const [expandTree, setTreeExpand] = useState(false);

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
      if (phrase) {
        const searchTree = {};
        searchResult.forEach(({ path, type }) => {
          searchTree[path] = type;
        });
        setSearchPhrase(phrase);
        setPropertiesTree(createTree(searchTree));
        setTreeExpand(true);
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
      onReset && onReset();
    };
  }, []);

  return (
    <SearchContext.Provider value={{ expandTree, searchPropertiesPhrase }}>
      <FiltersContext.Provider value={{ schema: collectionSchema }}>
        {filters.map((filter, idx, collection) => (
          <React.Fragment key={`fragment-${filter.id}`}>
            <Filter
              id={filter.id}
              key={`filter-${filter.id}`}
              filter={filter}
              properties={propertiesTree ? propertiesTree : schemaTree}
              onSearchProperties={searchHandler}
              onPropertyChange={(propertyName) => {
                const schemaType = collectionSchema[propertyName];
                const inferredType = SCHEMA_PROPS[schemaType];
                const operator = setOperator(inferredType, filter.operator);

                onChange(filter.id, {
                  propertyName,
                  propertyType: inferredType,
                  operator,
                  propertyValue: setDefaultValue(inferredType, operator),
                });

                setSearchPhrase(null);
                setPropertiesTree(schemaTree);
              }}
              onRemove={() => onRemove(filter.id)}
              onChange={(filter) => onChange(filter.id, filter)}
            />
            <AnimatePresence>
              {idx + 1 !== collection.length && (
                <motion.div key={`operator-${filter.id}`} {...operatorMotion}>
                  <Operator>
                    <Badge>{AND_OPERATOR}</Badge>
                  </Operator>
                </motion.div>
              )}
            </AnimatePresence>
          </React.Fragment>
        ))}
      </FiltersContext.Provider>
    </SearchContext.Provider>
  );
};

export default FiltersComponent;
