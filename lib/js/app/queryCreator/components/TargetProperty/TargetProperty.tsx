import React, { FC, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Container } from './TargetProperty.styles';
import { createTree } from '../../utils/createTree';

import Title from '../Title';
import Dropdown from '../Dropdown';
import PropertiesTree from '../PropertiesTree';
import DropableContainer, { Variant } from '../DropableContainer';

import { useSearch } from '../../hooks';
import { getCollectionSchema, getSchemas } from '../../modules/events';

import text from './text.json';

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
    (searchResult, searchPhrase) => {
      if (searchPhrase) {
        const searchTree = {};
        searchResult.forEach(({ path, type }) => {
          searchTree[path] = type;
        });
        setPropertiesTree(createTree(searchTree));
      } else {
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
      console.log('ZRESETUJMY TO !');
      onChange(null);
    }
    return () => onChange(null);
  }, [collection]);

  return (
    <Container ref={containerRef}>
      <Title>{text.label}</Title>
      <DropableContainer
        variant={variant}
        onClick={() => !isOpen && setOpen(true)}
        isActive={isOpen}
        value={property}
        searchable
        onSearch={searchHandler}
        onDefocus={(event: any) => {
          if (!event.path?.includes(containerRef.current)) {
            setPropertiesTree(null);
            setOpen(false);
          }
        }}
      >
        {property}
      </DropableContainer>
      <Dropdown isOpen={isOpen}>
        <PropertiesTree
          data-dropdown="target-property"
          onClick={(_e, property) => {
            setOpen(false);
            onChange(property);
            setPropertiesTree(createTree(collectionSchema));
          }}
          properties={propertiesTree ? propertiesTree : schemaTree}
        />
      </Dropdown>
    </Container>
  );
};

export default TargetProperty;
