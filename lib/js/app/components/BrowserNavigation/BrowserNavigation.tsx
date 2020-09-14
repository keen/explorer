import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { transparentize } from 'polished';
import { Button } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import {
  Container,
  Title,
  Actions,
  Settings,
  PulseMotion,
} from './BrowserNavigation.styles';
import text from './text.json';

import { createNewQuery } from '../../modules/app';

const pulseMotion = {
  animate: {
    boxShadow: `0 0 2px 5px ${transparentize(0.6, colors.green[400])}`,
  },
  transition: { yoyo: Infinity, repeatDelay: 0.3, duration: 0.5 },
};

type Props = {
  /** Pulse button to attract user attention */
  attractNewQueryButton: boolean;
};

const BrowserNavigation: FC<Props> = ({ attractNewQueryButton }) => {
  const dispatch = useDispatch();
  const pulseButtonProps = attractNewQueryButton ? pulseMotion : {};

  return (
    <Container>
      <Settings>
        <Title>{text.savedQueries}</Title>
      </Settings>
      <Actions>
        <PulseMotion {...pulseButtonProps}>
          <Button variant="success" onClick={() => dispatch(createNewQuery())}>
            {text.newQueryButton}
          </Button>
        </PulseMotion>
      </Actions>
    </Container>
  );
};
export default BrowserNavigation;
