import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@keen.io/ui-core';

import {
  Container,
  Title,
  Actions,
  Settings,
} from './BrowserNavigation.styles';
import text from './text.json';

import { createNewQuery } from '../../modules/app';

type Props = {};

const BrowserNavigation: FC<Props> = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Settings>
        <Title>{text.savedQueries}</Title>
      </Settings>
      <Actions>
        <Button variant="success" onClick={() => dispatch(createNewQuery())}>
          {text.newQueryButton}
        </Button>
      </Actions>
    </Container>
  );
};
export default BrowserNavigation;
