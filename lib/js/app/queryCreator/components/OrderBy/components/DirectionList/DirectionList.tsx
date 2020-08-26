import React, { FC, useState } from 'react';

import { Container, OrderList } from './DirectionList.styles';

import DropableContainer from '../../../DropableContainer';
import DropdownList from '../../../DropdownList';
import DropdownListContainer from '../../../DropdownListContainer';
import Dropdown from '../../../Dropdown';

import { Direction } from '../../types';
import { DIRECTION_OPTIONS } from '../../constants';

type Props = {
  /** Direction value */
  direction: Direction;
  /** Change event handler */
  onChange: (direction: Direction) => void;
};

const DirectionList: FC<Props> = ({ direction, onChange }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Container>
      <DropableContainer
        isActive={editMode}
        variant="secondary"
        onClick={() => !editMode && setEditMode(true)}
        onDefocus={() => setEditMode(false)}
        value={direction}
      >
        {direction}
      </DropableContainer>
      <Dropdown isOpen={editMode} fullWidth={false}>
        <OrderList data-testid="order-list">
          <DropdownListContainer scrollToActive maxHeight={240}>
            {(activeItemRef) => (
              <DropdownList
                ref={activeItemRef}
                items={DIRECTION_OPTIONS}
                setActiveItem={({ value }) => value === direction}
                onClick={(_e, { value }) => {
                  setEditMode(false);
                  onChange(value);
                }}
              />
            )}
          </DropdownListContainer>
        </OrderList>
      </Dropdown>
    </Container>
  );
};

export default DirectionList;
