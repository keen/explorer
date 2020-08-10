import React, { forwardRef } from 'react';

import { ListContainer, ListItem } from './DropdownList.styles';

interface ListElement {
  label: string;
  value: any;
}

type Props<T> = {
  /** Collection of items */
  items: T[];
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLLIElement>, item: T) => void;
  /** Active item function */
  setActiveItem?: (item: T, idx: number) => boolean;
  /** Item render function */
  renderItem?: (item: T, isActive: boolean) => JSX.Element;
};

const defaultItemRender = ({ label }) => <>{label}</>;

const defaultSetActive = () => false;

const DropdownList = forwardRef(
  <T extends ListElement>(
    {
      items,
      onClick,
      renderItem = defaultItemRender,
      setActiveItem = defaultSetActive,
    }: Props<T>,
    ref
  ) => {
    return (
      <ListContainer>
        {items.map((item, idx) => {
          const isActive = setActiveItem(item, idx);

          return (
            <ListItem
              isActive={isActive}
              ref={isActive ? ref : null}
              key={idx}
              onClick={(e) => onClick(e, item)}
            >
              {renderItem(item, isActive)}
            </ListItem>
          );
        })}
      </ListContainer>
    );
  }
);

DropdownList.displayName = 'DropdownList';

export default DropdownList;
