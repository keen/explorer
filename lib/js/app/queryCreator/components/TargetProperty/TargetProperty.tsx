import React, { FC, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from './TargetProperty.styles';
import { createTree } from '../../utils/createTree';

import Title from '../Title';
import Dropdown from '../Dropdown';
import PropertiesTree from '../PropertiesTree';
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
  const dispatch = useDispatch();
  const {
    schema: collectionSchema,
    tree: schemaTree,
    list: schemaList,
  } = useSelector((state: AppState) => getCollectionSchema(state, collection));

  const [propertiesTree, setPropertiesTree] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef(null);

  const targetProperty = useSelector(getTargetProperty);

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
    if (
      collectionSchema &&
      !Object.keys(collectionSchema).includes(targetProperty)
    ) {
      dispatch(selectTargetProperty(null));
    }
    return () => dispatch(selectTargetProperty(null));
  }, [collection]);

  return (
    <Container ref={containerRef}>
      <Title>{text.label}</Title>
      <PropertyContainer
        onClick={() => !isOpen && setOpen(true)}
        isActive={isOpen}
        value={targetProperty}
        searchable
        onSearch={searchHandler}
        onDefocus={(event: any) => {
          if (!event.path?.includes(containerRef.current)) {
            setPropertiesTree(null);
            setOpen(false);
          }
        }}
      >
        {targetProperty}
      </PropertyContainer>
      <Dropdown isOpen={isOpen}>
        <PropertiesTree
          data-dropdown="target-property"
          onClick={(_e, property) => {
            setOpen(false);
            dispatch(selectTargetProperty(property));
            setPropertiesTree(createTree(collectionSchema));
          }}
          properties={propertiesTree ? propertiesTree : schemaTree}
        />
      </Dropdown>
    </Container>
  );
};

export default TargetProperty;
