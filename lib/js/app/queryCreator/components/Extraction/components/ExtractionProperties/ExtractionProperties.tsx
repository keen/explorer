import React, { FC, useState, useRef, useEffect, useCallback } from 'react';
import Sortable from 'sortablejs';
import { v4 as uuid } from 'uuid';
import { ActionButton } from '@keen.io/ui-core';
import { useSelector } from 'react-redux';
import { useSearch } from '@keen.io/react-hooks';

import {
  PropertySettings,
  SortableContainer,
} from './ExtractionProperties.styles';
import ExtractionTitle from '../ExtractionTitle';

import SearchableProperty from '../../../SearchableProperty';

import { SearchContext } from '../../../../contexts';

import { getCollectionSchema } from '../../../../modules/events';
import { createTree, mutateArray } from '../../../../utils';

import { DRAG_DELAY, DRAG_ANIMATION_TIME } from './constants';

import { AppState, ExtractionProperty } from '../../../../types';

type Props = {
  /** Collection of properties to extract */
  properties: ExtractionProperty[];
  /** Query event collection */
  collection: string;
  /** Set properties event handler */
  onSetProperties: (properties: ExtractionProperty[]) => void;
};

const ExtractionProperties: FC<Props> = ({
  properties,
  collection,
  onSetProperties,
}) => {
  const [propertiesTree, setPropertiesTree] = useState(null);
  const [searchPropertiesPhrase, setSearchPhrase] = useState(null);
  const [expandTree, setTreeExpand] = useState(false);

  const propertiesRef = useRef(null);
  propertiesRef.current = properties;

  const {
    tree: schemaTree,
    list: schemaList,
  } = useSelector((state: AppState) => getCollectionSchema(state, collection));

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

  const clearSearchHandler = useCallback(() => {
    setPropertiesTree(null);
    setSearchPhrase(null);
  }, []);

  const updateProperty = useCallback(
    (propertySettings: ExtractionProperty) => {
      const propertiesSettings = properties.map((property) => {
        if (property.id === propertySettings.id) return propertySettings;
        return property;
      });
      onSetProperties(propertiesSettings);
    },
    [properties, onSetProperties]
  );

  const removeProperty = useCallback(
    (id: string) => {
      let propertiesSettings = properties.filter(
        (property) => property.id !== id
      );
      if (propertiesSettings.length === 0) propertiesSettings = undefined;
      onSetProperties(propertiesSettings);
    },
    [properties, onSetProperties]
  );

  const sortableRef = useRef(null);
  const [isDragged, setDragMode] = useState(false);

  useEffect(() => {
    let dragGhost;
    new Sortable(sortableRef.current, {
      animation: DRAG_ANIMATION_TIME,
      delay: DRAG_DELAY,
      filter: '.add-button',
      onStart: () => {
        setDragMode(true);
        setTreeExpand(false);
      },
      onMove: (evt) => !evt.related.className.includes('add-button'),
      onEnd: (evt) => {
        const updatedGroups = mutateArray(
          propertiesRef.current,
          evt.oldIndex,
          evt.newIndex
        );
        onSetProperties(updatedGroups);
        setDragMode(false);

        if (dragGhost) dragGhost.parentNode.removeChild(dragGhost);
      },
      setData: (dataTransfer, dragEl) => {
        dragGhost = dragEl.cloneNode(true);
        const styles = {
          width: dragEl.offsetWidth,
          transform: 'translateX(-100%)',
          position: 'absolute',
        };
        Object.assign(dragGhost.style, styles);

        const tree = dragGhost.querySelector('[data-testid="properties-tree"]');
        if (tree) tree.remove();

        document.body.appendChild(dragGhost);
        dataTransfer.setDragImage(dragGhost, 10, 10);
      },
    });
  }, []);

  return (
    <div>
      <ExtractionTitle
        isFullExtraction={properties.length === 0}
        onClearProperties={() => onSetProperties(undefined)}
      />
      <SearchContext.Provider value={{ expandTree, searchPropertiesPhrase }}>
        <SortableContainer ref={sortableRef}>
          {properties.map(({ id, propertyName }) => (
            <PropertySettings key={id} data-testid="extraction-settings-item">
              <SearchableProperty
                isEditAllowed={!isDragged}
                properties={propertiesTree ? propertiesTree : schemaTree}
                property={propertyName}
                onSearchProperties={searchHandler}
                onSelectProperty={(propertyName) => {
                  clearSearchHandler();
                  updateProperty({ id, propertyName });
                }}
                onRemove={() => {
                  clearSearchHandler();
                  removeProperty(id);
                }}
              />
            </PropertySettings>
          ))}
          <ActionButton
            className="add-button"
            isDisabled={!collection}
            action="create"
            onClick={() => {
              const property = {
                id: uuid(),
                propertyName: '',
              };

              onSetProperties([...properties, property]);
            }}
          />
        </SortableContainer>
      </SearchContext.Provider>
    </div>
  );
};

export default ExtractionProperties;
