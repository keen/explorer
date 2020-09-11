import React, { FC, useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, CircleButton, Dropdown } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';

import {
  Container,
  ButtonWrapper,
  BasicActions,
  ActionsContainer,
  ContextActions,
} from './BrowserQueryMenu.styles';
import text from './text.json';

import ActionsMenu from '../ActionsMenu';
import { showQuerySettingsModal, SettingsModalSource } from '../../modules/app';

const actionsDropdownMotion = {
  initial: { opacity: 0, top: 20, left: 37, translateX: '-100%' },
  animate: { opacity: 1, top: 2, left: 37, translateX: '-100%' },
  exit: { opacity: 0, top: 30, left: 37 },
};

type Props = {
  /** Edit query event handler */
  onEditQuery: () => void;
  /** Remove query event handler */
  onRemoveQuery: () => void;
};

const BrowserQueryMenu: FC<Props> = ({ onEditQuery, onRemoveQuery }) => {
  const dispatch = useDispatch();
  const actionsContainer = useRef(null);

  const [actionsMenu, setActionsMenuVisibility] = useState(false);
  const outsideActionsMenuClick = useCallback(
    (e) => {
      if (
        actionsMenu &&
        actionsContainer.current &&
        !actionsContainer.current.contains(e.target)
      ) {
        setActionsMenuVisibility(false);
      }
    },
    [actionsContainer, actionsMenu]
  );

  useEffect(() => {
    if (actionsMenu) {
      document.addEventListener('click', outsideActionsMenuClick);
    }

    return () => document.removeEventListener('click', outsideActionsMenuClick);
  }, [actionsMenu, actionsContainer]);

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
        <ActionsContainer ref={actionsContainer} marginLeft={10}>
          <CircleButton
            icon={<Icon type="actions" />}
            onClick={() => setActionsMenuVisibility(!actionsMenu)}
          />
          <Dropdown
            isOpen={actionsMenu}
            fullWidth={false}
            motion={actionsDropdownMotion}
          >
            <ActionsMenu
              isNewQuery={false}
              onShareQuery={() => setActionsMenuVisibility(false)}
              onRemoveQuery={() => {
                setActionsMenuVisibility(false);
                onRemoveQuery();
              }}
            />
          </Dropdown>
        </ActionsContainer>
      </ContextActions>
    </Container>
  );
};

export default BrowserQueryMenu;
