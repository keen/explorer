import React from 'react';

import { ListContainer, ListItem } from './DropdownList.styles';

interface ListElement {
  label: string;
  value: any;
}

type Props<T extends ListElement> = {
  items: T[];
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLLIElement>, item: T) => void;
  /** Item render function */
  renderItem?: (item: T) => JSX.Element;
};

const defaultItemRender = ({ label }) => <>{label}</>;

const DropdownList = <T extends ListElement>({
  items,
  onClick,
  renderItem = defaultItemRender,
}: Props<T>) => {
  return (
    <ListContainer>
      {items.map((item, idx) => (
        <ListItem key={idx} onClick={(e) => onClick(e, item)}>
          {renderItem(item)}
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default DropdownList;
