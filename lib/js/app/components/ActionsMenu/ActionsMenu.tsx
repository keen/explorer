import React, { FC } from 'react';
import { DropdownMenu } from '@keen.io/ui-core';

import { Container } from './ActionsMenu.styles';

import text from './text.json';

type Props = {};

const ActionsMenu: FC<Props> = () => (
  <Container>
    <DropdownMenu.Container>
      <DropdownMenu.Item>Example #1</DropdownMenu.Item>
      <DropdownMenu.Divider />
      <DropdownMenu.Item>{text.deleteQuery}</DropdownMenu.Item>
    </DropdownMenu.Container>
  </Container>
);

export default ActionsMenu;
