import React, { FC, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import {
  Container,
  TreeContainer,
  PropertyOverflow,
} from './TargetProperty.styles';
import { createTree } from '../../utils/createTree';

import Title from '../Title';
import EmptySearch from '../EmptySearch';
import Dropdown from '../Dropdown';
import PropertyPath from '../PropertyPath';
import PropertiesTree from '../PropertiesTree';
import DropableContainer, { Variant } from '../DropableContainer';

import { useSearch } from '../../hooks';
import { getCollectionSchema, getSchemas } from '../../modules/events';

import text from './text.json';
import { SEPARATOR, EXPAND_TRESHOLD } from './constants';

import { AppState } from '../../types';

type Props = {
  /** Events collection identifer */
  collection: string;
  /** Change event handler */
  onChange: (property: string) => void;
  /** Target property */
  property?: string;
  /** Container variant */
  variant?: Variant;
};

const TargetProperty: FC<Props> = ({
  collection,
  onChange,
  property,
  variant = 'primary',
}) => {
  const [searchPhrase, setSearchPhrase] = useState(null);
  const [expandTree, setTreeExpand] = useState(false);
  const expandTrigger = useRef(null);

  const {
    schema: collectionSchema,
    tree: schemaTree,
    list: schemaList,
  } = useSelector((state: AppState) => getCollectionSchema(state, collection));

  const isSchemaExist = useSelector((state: AppState) => {
    if (!collection) return false;
    if (collection && getSchemas(state)[collection]) return true;
    return false;
  });

  const [propertiesTree, setPropertiesTree] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef(null);

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
        }, EXPAND_TRESHOLD);
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
    if (isSchemaExist && !Object.keys(collectionSchema).includes(property)) {
      onChange(null);
    }
    return () => onChange(null);
  }, [collection]);

  useEffect(() => {
    if (!isOpen) {
      setTreeExpand(false);
      setSearchPhrase(null);
    }
  }, [isOpen]);

  const isEmptySearch =
    searchPhrase && propertiesTree && !Object.keys(propertiesTree).length;

  return (
    <Container ref={containerRef}>
      <Title isDisabled={!collection} onClick={() => !isOpen && setOpen(true)}>
        {text.label}
      </Title>
      <DropableContainer
        variant={variant}
        onClick={() => !isOpen && collection && setOpen(true)}
        isActive={isOpen}
        value={property}
        searchable
        searchPlaceholder={text.searchPlaceholder}
        placeholder={text.placeholder}
        onSearch={searchHandler}
        onDefocus={(event: any) => {
          if (!event.path?.includes(containerRef.current)) {
            setPropertiesTree(null);
            setOpen(false);
          }
        }}
      >
        <PropertyOverflow>
          {property && <PropertyPath path={property.split(SEPARATOR)} />}
        </PropertyOverflow>
      </DropableContainer>
      <Dropdown isOpen={isOpen}>
        {isEmptySearch ? (
          <EmptySearch message={text.emptySearchResults} />
        ) : (
          <TreeContainer>
            <PropertiesTree
              expanded={expandTree}
              onClick={(_e, property) => {
                setOpen(false);
                onChange(property);
                setPropertiesTree(createTree(collectionSchema));
              }}
              activeProperty={property}
              properties={propertiesTree ? propertiesTree : schemaTree}
            />
          </TreeContainer>
        )}
      </Dropdown>
    </Container>
  );
};

export default TargetProperty;
