import React, { FC, useState, useRef, useCallback } from 'react';
import { ActionButton } from '@keen.io/ui-core';

import { Container, List, DropdownContainer } from './FilterListValue.styles';

import DropableContainer from '../../../DropableContainer';
import Dropdown from '../../../Dropdown';
import Input from '../../../Input';
import PropertyGroup, { PropertyItem } from '../../../PropertyGroup';

import text from './text.json';

import { SEPARATOR } from './constants';
import { KEYBOARD_KEYS } from '../../../../constants';

type Props = {
  value: Array<string | number>;
  /** Change event handler */
  onChange: (value: Array<string | number>) => void;
};

const FilterListValue: FC<Props> = ({ value, onChange }) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);

  const removeHandler = useCallback((item: string|number) => {
    const updatedList = value.filter((v) => v !== item);
    onChange(updatedList);
  }, [value, onChange]);

  return (
    <Container ref={containerRef}>
      <DropableContainer
        isActive={editMode}
        variant="secondary"
        onClick={() => !editMode && setEditMode(true)}
        onDefocus={(event: any) => {
          if (!event.path?.includes(containerRef.current)) {
            setEditMode(false);
          }
        }}
        placeholder={text.placeholder}
        value={value.length ? value : null}
      >
        {value.join(SEPARATOR)}
      </DropableContainer>
      <Dropdown isOpen={editMode} fullWidth={false}>
        <DropdownContainer>
          <Input
            ref={inputRef}
            autoFocus
            placeholder={text.inputPlaceholder}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.charCode === KEYBOARD_KEYS.ENTER) {
                e.preventDefault();
                const eventValue = parseFloat(e.currentTarget.value);

                const itemValue = Number.isNaN(eventValue) ? e.currentTarget.value : eventValue;

                if (!value.includes(itemValue)) {
                  onChange([...value, itemValue]);
                }

                inputRef.current.value = '';
              }
            }}
          />
          <List>
            {value.map((item, idx) => (
              <PropertyGroup isActive={false} key={idx}>
                <PropertyItem>
                  {item}
                </PropertyItem>
                <PropertyItem>
                  <ActionButton
                    action="remove"
                    onClick={() => removeHandler(item)}
                    background="transparent"
                  />
                </PropertyItem>
              </PropertyGroup>
            ))}
          </List>
        </DropdownContainer>
      </Dropdown>
    </Container>
  );
};

export default FilterListValue;
