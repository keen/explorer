import React, { FC } from 'react';
import { DropdownMenu } from '@keen.io/ui-core';

import { Container, DeleteQueryItem } from './ActionsMenu.styles';

import text from './text.json';

type Props = {
  /** Is new query */
  isNewQuery: boolean;
  /** Remove query event handler */
  onRemoveQuery: () => void;
};

const ActionsMenu: FC<Props> = ({ isNewQuery, onRemoveQuery }) => (
  <Container>
    <DropdownMenu.Container>
      <DropdownMenu.Item>Example #1</DropdownMenu.Item>
      <DropdownMenu.Divider />
      {!isNewQuery && (
        <DropdownMenu.Item onClick={onRemoveQuery}>
          <DeleteQueryItem>{text.deleteQuery}</DeleteQueryItem>
        </DropdownMenu.Item>
      )}
    </DropdownMenu.Container>
  </Container>
);

export default ActionsMenu;
