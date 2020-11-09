import React, { FC, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { Dropdown, Tooltip } from '@keen.io/ui-core';
import { useSearch } from '@keen.io/react-hooks';

import {
  Container,
  PropertyOverflow,
  TooltipMotion,
} from './TargetProperty.styles';
import { createTree } from '../../utils';

import TooltipContent from '../TooltipContent';
import Title from '../Title';
import EmptySearch from '../EmptySearch';
import PropertyPath from '../PropertyPath';
import PropertiesTree from '../PropertiesTree';
import DropableContainer, { Variant } from '../DropableContainer';

import { getEventPath } from '../../utils';
import { getCollectionSchema, getSchemas } from '../../modules/events';

import { TOOLTIP_MOTION } from '../../constants';
import { SEPARATOR } from './constants';

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
  /** Error */
  hasError?: boolean;
};

const TargetProperty: FC<Props> = ({
  collection,
  onChange,
  property,
  variant = 'primary',
  hasError = false,
}) => {
  const { t } = useTranslation();
  const [expandTree, setTreeExpand] = useState(false);
  const [hint, showHint] = useState(false);

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

  const { searchHandler, searchPhrase, clearSearchPhrase } = useSearch<{
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
    if (isSchemaExist && !Object.keys(collectionSchema).includes(property)) {
      onChange(null);
    }
    return () => onChange(null);
  }, [collection]);

  useEffect(() => {
    if (!isOpen) {
      setTreeExpand(false);
      clearSearchPhrase();
    }
  }, [isOpen]);

  const isEmptySearch =
    searchPhrase && propertiesTree && !Object.keys(propertiesTree).length;

  return (
    <Container
      data-testid="target-property-wrapper"
      onMouseEnter={() => !collection && showHint(true)}
      onMouseLeave={() => !collection && showHint(false)}
      ref={containerRef}
    >
      <Title
        isDisabled={!collection}
        onClick={() => !isOpen && setOpen(true)}
        hasError={hasError}
      >
        {t('query_creator_target_property.label')}
      </Title>
      <DropableContainer
        hasError={hasError}
        variant={variant}
        onClick={() => !isOpen && collection && setOpen(true)}
        isActive={isOpen}
        value={property}
        searchable
        dropIndicator
        searchPlaceholder={t(
          'query_creator_target_property.search_placeholder'
        )}
        placeholder={t('query_creator_target_property.placeholder')}
        onSearch={searchHandler}
        onDefocus={(event: any) => {
          if (!getEventPath(event)?.includes(containerRef.current)) {
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
          <EmptySearch
            message={t('query_creator_target_property.empty_search_results')}
          />
        ) : (
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
        )}
      </Dropdown>
      {!collection && (
        <AnimatePresence>
          {hint && (
            <TooltipMotion
              {...TOOLTIP_MOTION}
              data-testid="target-property-hint"
            >
              <Tooltip hasArrow={false} mode="dark">
                <TooltipContent>
                  {t('query_creator_target_property.select')}{' '}
                  <strong>
                    {t('query_creator_target_property.event_stream')}
                  </strong>{' '}
                  {t('query_creator_target_property.first')}
                </TooltipContent>
              </Tooltip>
            </TooltipMotion>
          )}
        </AnimatePresence>
      )}
    </Container>
  );
};

export default TargetProperty;
