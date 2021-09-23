import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { transparentize } from 'polished';
import { Button } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import {
  Container,
  Title,
  Actions,
  Settings,
  Socket,
  PulseMotion,
} from './BrowserNavigation.styles';

import { createNewQuery } from '../../modules/app';

const pulseMotion = {
  animate: {
    boxShadow: `0 0 2px 4px ${transparentize(0.6, colors.green[400])}`,
  },
  transition: { yoyo: Infinity, repeatDelay: 0.3, duration: 0.5 },
};

type Props = {
  /** Pulse button to attract user attention */
  attractNewQueryButton: boolean;
  /** React children nodes */
  children: React.ReactNode;
};

const BrowserNavigation: FC<Props> = ({ attractNewQueryButton, children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pulseButtonProps = attractNewQueryButton ? pulseMotion : {};

  return (
    <Container>
      <Settings>
        <Title>{t('browser_navigation.title')}</Title>
        <Socket>{children}</Socket>
      </Settings>
      <Actions>
        <PulseMotion {...pulseButtonProps}>
          <Button
            variant="success"
            onClick={() => {
              dispatch(createNewQuery());
            }}
          >
            {t('browser_navigation.new_query_button')}
          </Button>
        </PulseMotion>
      </Actions>
    </Container>
  );
};
export default BrowserNavigation;
