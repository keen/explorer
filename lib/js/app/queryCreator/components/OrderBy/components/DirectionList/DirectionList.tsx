import React, { FC, useState } from 'react';
import { Dropdown } from '@keen.io/ui-core';

import DropableContainer from '../../../DropableContainer';
import DropdownList from '../../../DropdownList';
import DropdownListContainer from '../../../DropdownListContainer';

import { Container, OrderList, DropableWrapper } from './DirectionList.styles';

import { OrderDirection } from '../../types';
import { DIRECTION_OPTIONS } from '../../constants';

type Props = {
  /** Direction value */
  direction?: OrderDirection;
  /** Change event handler */
  onChange: (direction: OrderDirection) => void;
};

const DirectionList: FC<Props> = ({ direction = 'DESC', onChange }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Container>
      <DropableWrapper>
        <DropableContainer
          isActive={editMode}
          variant="secondary"
          onClick={() => !editMode && setEditMode(true)}
          onDefocus={() => setEditMode(false)}
          value={direction}
        >
          {direction}
        </DropableContainer>
      </DropableWrapper>
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
