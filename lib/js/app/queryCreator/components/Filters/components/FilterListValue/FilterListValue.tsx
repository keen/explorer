import React, { FC, useState, useRef, useCallback } from 'react';
import { Dropdown, Input } from '@keen.io/ui-core';

import {
  Container,
  List,
  ListItem,
  DropdownContainer,
  ItemContainer,
} from './FilterListValue.styles';

import DropableContainer from '../../../DropableContainer';
import PropertyGroup from '../../../PropertyGroup';

import Value from './Value';

import { getEventPath } from '../../../../utils';
import text from './text.json';

import { SEPARATOR } from './constants';
import { KEYBOARD_KEYS } from '../../../../constants';

type Props = {
  /** List values */
  items: Array<string | number>;
  /** Change event handler */
  onChange: (value: Array<string | number>) => void;
};

const FilterListValue: FC<Props> = ({ items, onChange }) => {
  const containerRef = useRef(null);
  const [editMode, setEditMode] = useState(false);

  const removeHandler = useCallback(
    (item: string | number) => {
      const updatedList = items.filter((v) => v !== item);
      onChange(updatedList);
    },
    [items, onChange]
  );

  return (
    <Container ref={containerRef}>
      <DropableContainer
        isActive={editMode}
        variant="secondary"
        onClick={() => !editMode && setEditMode(true)}
        onDefocus={(event: any) => {
          if (!getEventPath(event)?.includes(containerRef.current)) {
            setEditMode(false);
          }
        }}
        placeholder={text.placeholder}
        value={items.length ? items : null}
      >
        <ItemContainer>{items.join(SEPARATOR)}</ItemContainer>
      </DropableContainer>
      <Dropdown isOpen={editMode} fullWidth={false}>
        <DropdownContainer>
          <Input
            autoFocus
            variant="solid"
            data-testid="list-input"
            placeholder={text.inputPlaceholder}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.charCode === KEYBOARD_KEYS.ENTER) {
                e.preventDefault();
                const eventValue = parseFloat(e.currentTarget.value);
                const value = Number.isNaN(eventValue)
                  ? e.currentTarget.value
                  : eventValue;

                if (!items.includes(value)) {
                  onChange([...items, value]);
                }

                e.currentTarget.value = '';
              }
            }}
          />
          <List>
            {items.map((value, idx) => (
              <ListItem key={idx}>
                <PropertyGroup isActive={false}>
                  <Value value={value} removeHandler={removeHandler} />
                </PropertyGroup>
              </ListItem>
            ))}
          </List>
        </DropdownContainer>
      </Dropdown>
    </Container>
  );
};

export default FilterListValue;
