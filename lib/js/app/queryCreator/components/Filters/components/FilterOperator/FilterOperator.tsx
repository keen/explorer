import React, { FC, useState, useEffect, useMemo } from 'react';

import { Container, OperatorsList } from './FilterOperator.styles';

import DropableContainer from '../../../DropableContainer';
import DropdownList from '../../../DropdownList';
import DropdownListContainer from '../../../DropdownListContainer';
import Dropdown from '../../../Dropdown';

import text from './text.json';
import { FILTER_OPERATORS } from './constants';

import { Operator, Property } from '../../types';

type Props = {
  /** Property type */
  propertyType: Property;
  /** Operator value */
  operator: Operator;
  /** Change event handler */
  onChange: (operator: Operator) => void;
};

const FilterOperator: FC<Props> = ({ operator, propertyType, onChange }) => {
  const [editMode, setEditMode] = useState(false);
  const operators = useMemo(
    () =>
      FILTER_OPERATORS.filter(({ dataTypes }) =>
        dataTypes.includes(propertyType)
      ),
    [propertyType]
  );

  useEffect(() => {
    if (propertyType && operators) {
      const [firstOperator] = operators;
      const { value } = firstOperator;
      onChange(value);
    }
  }, [propertyType, operators]);

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
        {operator}
      </DropableContainer>
      <Dropdown isOpen={editMode} fullWidth={false}>
        <OperatorsList>
          <DropdownListContainer scrollToActive maxHeight={240}>
            {(activeItemRef) => (
              <DropdownList
                ref={activeItemRef}
                items={operators}
                setActiveItem={({ value }) => value === operator}
                onClick={(_e, { value }) => {
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
