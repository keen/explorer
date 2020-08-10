import React, {
  FC,
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { ActionButton } from '@keen.io/ui-core';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import {
  Container,
  DropdownContent,
  StyledPropertyItem,
} from './GroupByProperty.styles';

import PropertyGroup, { PropertyItem } from '../../../PropertyGroup';
import Dropdown from '../../../Dropdown';
import Property from '../../../Property';
import EmptySearch from '../../../EmptySearch';
import PropertiesTree from '../../../PropertiesTree';

import text from './text.json';

import { SearchContext } from '../../../../contexts';

type Props = {
  /** Properties tree */
  properties: Record<string, string[] | Record<string, any>>;
  /** Property */
  property?: string;
  /** Enable edit mode */
  isEditAllowed: boolean;
  /** Select property event handler */
  onSelectProperty: (property: string) => void;
  /** Search properties event handler */
  onSearchProperties: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Remove event handler */
  onRemove: () => void;
};

const GroupByProperty: FC<Props> = ({
  property,
  isEditAllowed,
  properties,
  onSelectProperty,
  onSearchProperties,
  onRemove,
}) => {
  const [editMode, setEditMode] = useState(!property);
  const containerRef = useRef(null);

  const { expandTree, searchPropertiesPhrase } = useContext(SearchContext);

  const isEmptySearch =
    searchPropertiesPhrase && properties && !Object.keys(properties).length;

  const outsideClick = useCallback(
    (e) => {
      if (
        editMode &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setEditMode(false);
      }
    },
    [editMode, containerRef]
  );

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [editMode, containerRef]);

  useEffect(() => {
    if (!isEditAllowed) setEditMode(false);
  }, [isEditAllowed, editMode]);

  return (
    <Container
      ref={containerRef}
      onClick={() => !editMode && setEditMode(true)}
      data-testid="groupBy-property"
    >
      <PropertyGroup isActive={editMode}>
        <PropertyItem>
          <Property
            property={property}
            editMode={editMode}
            placeholder={text.placeholder}
            searchPlaceholder={text.searchPlaceholder}
            onEditInputChange={onSearchProperties}
          />
        </PropertyItem>
        <StyledPropertyItem>
          <ActionButton
            onClick={onRemove}
            action="remove"
            borderRadius="0 4px 4px 0"
            background="transparent"
            backgroundHover={transparentize(0.85, colors.blue['100'])}
          />
        </StyledPropertyItem>
      </PropertyGroup>
      <Dropdown isOpen={editMode} fullWidth={false}>
        <DropdownContent>
          {isEmptySearch ? (
            <EmptySearch message={text.emptySearchResults} />
          ) : (
            <PropertiesTree
              expanded={expandTree}
              activeProperty={property}
              properties={properties}
              onClick={(_e, property) => {
                onSelectProperty(property);
                setEditMode(false);
              }}
            />
          )}
        </DropdownContent>
      </Dropdown>
    </Container>
  );
};

export default GroupByProperty;
