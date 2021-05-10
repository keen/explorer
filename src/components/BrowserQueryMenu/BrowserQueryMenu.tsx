import React, { FC, useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  CircleButton,
  Dropdown,
  MousePositionedTooltip,
} from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import TooltipContent from '../TooltipContent';
import {
  Container,
  BasicActions,
  ActionsContainer,
  ContextActions,
} from './BrowserQueryMenu.styles';

import ActionsMenu from '../ActionsMenu';
import {
  showQuerySettingsModal,
  SettingsModalSource,
  shareQueryUrl,
} from '../../modules/app';

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

const menuTooltip = (text: string) => (
  <TooltipContent color={colors.black[500]}>{text}</TooltipContent>
);

const BrowserQueryMenu: FC<Props> = ({ onEditQuery, onRemoveQuery }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
          {t('browser_query_menu.edit_query')}
        </Button>
      </BasicActions>
      <ContextActions data-testid="context-buttons">
        <MousePositionedTooltip
          isActive={!actionsMenu}
          tooltipPinPlacement="bottom-left"
          renderContent={() =>
            menuTooltip(t('browser_query_menu.settings_tooltip'))
          }
        >
          <ActionsContainer>
            <CircleButton
              variant="secondary"
              icon={<Icon type="settings" />}
              onClick={() => {
                dispatch(
                  showQuerySettingsModal(SettingsModalSource.QUERY_SETTINGS)
                );
              }}
            />
          </ActionsContainer>
        </MousePositionedTooltip>
        <MousePositionedTooltip
          isActive={!actionsMenu}
          tooltipPinPlacement="bottom-left"
          renderContent={() =>
            menuTooltip(t('browser_query_menu.share_tooltip'))
          }
        >
          <ActionsContainer data-testid="share-query" marginLeft={10}>
            <CircleButton
              variant="secondary"
              icon={<Icon type="share" />}
              onClick={() => {
                dispatch(shareQueryUrl());
              }}
            />
          </ActionsContainer>
        </MousePositionedTooltip>
        <MousePositionedTooltip
          isActive={!actionsMenu}
          tooltipPinPlacement="bottom-left"
          renderContent={() =>
            menuTooltip(t('browser_query_menu.actions_tooltip'))
          }
        >
          <ActionsContainer ref={actionsContainer} marginLeft={10}>
            <CircleButton
              variant="secondary"
              icon={<Icon type="actions" />}
              onClick={() => {
                setActionsMenuVisibility(!actionsMenu);
              }}
            />
            <Dropdown
              isOpen={actionsMenu}
              fullWidth={false}
              motion={actionsDropdownMotion}
            >
              <ActionsMenu
                isNewQuery={false}
                isVisible={actionsMenu}
                isInsideQueryBrowser
                onHideMenu={() => setActionsMenuVisibility(false)}
                onRemoveQuery={() => {
                  setActionsMenuVisibility(false);
                  onRemoveQuery();
                }}
              />
            </Dropdown>
          </ActionsContainer>
        </MousePositionedTooltip>
      </ContextActions>
    </Container>
  );
};

export default BrowserQueryMenu;
