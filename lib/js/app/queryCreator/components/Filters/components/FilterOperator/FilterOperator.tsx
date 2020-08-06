import React, { FC, useState, useMemo, useEffect, useRef } from 'react';

import { Container, OperatorsList } from './FilterOperator.styles';

import DropableContainer from '../../../DropableContainer';
import DropdownList from '../../../DropdownList';
import DropdownListContainer from '../../../DropdownListContainer';
import Dropdown from '../../../Dropdown';

import { createOptions, getLabel } from './utils';
import text from './text.json';

import { Operator, Property } from '../../../../types';

type Props = {
  /** Property */
  property?: string;
  /** Property type */
  propertyType: Property;
  /** Operator value */
  operator: Operator;
  /** Change event handler */
  onChange: (operator: Operator, rootOperator?: Operator) => void;
};

const FilterOperator: FC<Props> = ({
  operator,
  property,
  propertyType,
  onChange,
}) => {
  const [editMode, setEditMode] = useState(false);
  const operators = useMemo(() => createOptions(propertyType), [propertyType]);
  const propertyRef = useRef(property);

  useEffect(() => {
    if (property && !propertyRef.current) {
      propertyRef.current = property;
      setEditMode(true);
    }
  }, [property]);

  return (
    <Container>
      <DropableContainer
        isActive={editMode}
        variant="secondary"
        onClick={() => !editMode && propertyType && setEditMode(true)}
        onDefocus={() => setEditMode(false)}
        placeholder={text.placeholder}
        value={operator}
      >
        {getLabel(propertyType, operator)}
      </DropableContainer>
      <Dropdown isOpen={editMode} fullWidth={false}>
        <OperatorsList>
          <DropdownListContainer scrollToActive maxHeight={240}>
            {(activeItemRef) => (
              <DropdownList
                ref={activeItemRef}
                items={operators}
                setActiveItem={({ value }) => value === operator}
                onClick={(
                  _e,
                  {
                    value,
                  }
                ) => {
                  setEditMode(false);
                  onChange(value);
                }}
              />
            )}
          </DropdownListContainer>
        </OperatorsList>
      </Dropdown>
    </Container>
  );
};

export default FilterOperator;
