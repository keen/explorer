import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button, CircleButton } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';

import {
  Container,
  ButtonWrapper,
  BasicActions,
  ContextActions,
} from './BrowserQueryMenu.styles';
import text from './text.json';

import { showQuerySettingsModal, SettingsModalSource } from '../../modules/app';

type Props = {
  /** Edit query event handler */
  onEditQuery: () => void;
  /** Remove query event handler */
  onRemoveQuery: () => void;
};

const BrowserQueryMenu: FC<Props> = ({ onEditQuery, onRemoveQuery }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <BasicActions>
        <Button variant="secondary" onClick={onEditQuery}>
          {text.editQuery}
        </Button>
        <ButtonWrapper marginLeft={10}>
          <Button variant="danger" style="outline" onClick={onRemoveQuery}>
            {text.removeQuery}
          </Button>
        </ButtonWrapper>
      </BasicActions>
      <ContextActions>
        <CircleButton
          icon={<Icon type="settings" />}
          onClick={() =>
            dispatch(showQuerySettingsModal(SettingsModalSource.QUERY_SETTINGS))
          }
        />
      </ContextActions>
    </Container>
  );
};

export default BrowserQueryMenu;
