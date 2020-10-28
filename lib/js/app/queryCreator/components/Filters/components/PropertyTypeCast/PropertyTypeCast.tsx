import React, {
  FC,
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '@keen.io/ui-core';

import {
  Container,
  DropableContainer,
  DropdownContainer,
  WarningMessage,
  DefaultLabel,
  ItemContainer,
} from './PropertyTypeCast.styles';

import FiltersContext from '../../FiltersContext';

import DropdownList from '../../../DropdownList';
import DropdownListContainer from '../../../DropdownListContainer';

import { createOptions } from './utils';

import { DATA_TYPES } from './constants';
import { SCHEMA_PROPS } from '../../../../constants';

import { Property } from '../../../../types';

type Props = {
  /** Property */
  property: string;
  /** Property type */
  type: Property;
  /** Change event handler */
  onChange: (type: Property) => void;
};

const PropertyTypeCast: FC<Props> = ({ type, property, onChange }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const containerRef = useRef(null);
  const { schema } = useContext(FiltersContext);

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

  const schemaType = property ? SCHEMA_PROPS[schema[property]] : null;

  return (
    <Container
      data-testid="property-type-cast"
      ref={containerRef}
      onClick={(e) => {
        e.stopPropagation();
        !editMode && setEditMode(true);
      }}
    >
      <DropableContainer editMode={editMode} isActive={schemaType !== type}>
        {type}
      </DropableContainer>
      <Dropdown isOpen={editMode} fullWidth={false}>
        <DropdownContainer>
          <WarningMessage>
            {t('query_creator_property_type_cast.cast_message')}
          </WarningMessage>
          <DropdownListContainer scrollToActive maxHeight={240}>
            {(activeItemRef) => (
              <DropdownList
                ref={activeItemRef}
                items={createOptions(DATA_TYPES)}
                renderItem={({ label, value }) => (
                  <ItemContainer>
                    <span>{label}</span>{' '}
                    {value === schemaType && (
                      <DefaultLabel>
                        {t('query_creator_property_type_cast.default_label')}
                      </DefaultLabel>
                    )}
                  </ItemContainer>
                )}
                setActiveItem={({ value }) => value === type}
                onClick={(_e, { value }) => {
                  setEditMode(false);
                  onChange(value);
                }}
              />
            )}
          </DropdownListContainer>
        </DropdownContainer>
      </Dropdown>
    </Container>
  );
};

export default PropertyTypeCast;
