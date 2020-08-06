import React, {
  FC,
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from 'react';

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
import Dropdown from '../../../Dropdown';

import { createOptions } from './utils';
import text from './text.json';

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
          <WarningMessage>{text.castMessage}</WarningMessage>
          <DropdownListContainer scrollToActive maxHeight={240}>
            {(activeItemRef) => (
              <DropdownList
                ref={activeItemRef}
                items={createOptions(DATA_TYPES)}
                renderItem={({ label, value }) => (
                  <ItemContainer>
                    <span>{label}</span>{' '}
                    {value === schemaType && (
                      <DefaultLabel>{text.defaultLabel}</DefaultLabel>
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
