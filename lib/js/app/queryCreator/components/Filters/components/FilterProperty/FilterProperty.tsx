import React, {
  FC,
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '@keen.io/ui-core';

import { Container, DropdownContent } from './FilterProperty.styles';

import EmptySearch from '../../../EmptySearch';
import PropertyGroup, { PropertyItem } from '../../../PropertyGroup';
import Property from '../../../Property';
import PropertiesTree from '../../../PropertiesTree';

import PropertyTypeCast from '../PropertyTypeCast';

import { SearchContext } from '../../../../contexts';

import { Property as PropertyType } from '../../../../types';

type Props = {
  /** Property */
  property?: string;
  /** Property type */
  type?: PropertyType;
  /** Search properties event handler */
  onSearchProperties: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Select property event handler */
  onSelectProperty: (property: string) => void;
  /** Select property event handler */
  onCastPropertyType: (type: PropertyType) => void;
  /** Blur event handler */
  onBlur: () => void;
  /** Properties tree */
  properties: Record<string, string[] | Record<string, any>>;
};

const FilterProperty: FC<Props> = ({
  property,
  type,
  properties,
  onBlur,
  onSelectProperty,
  onCastPropertyType,
  onSearchProperties,
}) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
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
        onBlur();
      }
    },
    [editMode, containerRef]
  );

  useEffect(() => {
    if (!property) setEditMode(true);
  }, []);

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [editMode, containerRef]);

  return (
    <Container
      ref={containerRef}
      onClick={() => !editMode && setEditMode(true)}
      data-testid="filter-property"
    >
      <PropertyGroup isActive={editMode}>
        <PropertyItem>
          <Property
            property={property}
            editMode={editMode}
            placeholder={t('query_creator_filter_property.placeholder')}
            searchPlaceholder={t(
              'query_creator_filter_property.search_placeholder'
            )}
            onEditInputChange={onSearchProperties}
          />
        </PropertyItem>
        {property && !editMode && (
          <PropertyTypeCast
            property={property}
            type={type}
            onChange={onCastPropertyType}
          />
        )}
      </PropertyGroup>
      <Dropdown isOpen={editMode} fullWidth={false}>
        <DropdownContent>
          {isEmptySearch ? (
            <EmptySearch
              message={t('query_creator_filter_property.empty_search_results')}
            />
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

export default FilterProperty;
