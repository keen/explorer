import React, { FC, useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { Button, CircleButton, Dropdown, Tooltip } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import TooltipContent from '../TooltipContent';
import {
  Container,
  ButtonWrapper,
  BasicActions,
  ActionsContainer,
  ContextActions,
  TooltipMotion,
} from './BrowserQueryMenu.styles';

import ActionsMenu from '../ActionsMenu';
import { showQuerySettingsModal, SettingsModalSource } from '../../modules/app';

import { TOOLTIP_MOTION } from '../../constants';

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
  const { t } = useTranslation();
  const actionsContainer = useRef(null);

  const [actionsMenu, setActionsMenuVisibility] = useState(false);
  const [actionsTooltip, showActionsTooltip] = useState(false);
  const [settingsTooltip, showSettingsTooltip] = useState(false);
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
        <ButtonWrapper marginLeft={10}>
          <Button variant="danger" style="outline" onClick={onRemoveQuery}>
            {t('browser_query_menu.remove_query')}
          </Button>
        </ButtonWrapper>
      </BasicActions>
      <ContextActions data-testid="context-buttons">
        <ActionsContainer
          onMouseEnter={() => showSettingsTooltip(true)}
          onMouseLeave={() => showSettingsTooltip(false)}
        >
          <CircleButton
            icon={<Icon type="settings" />}
            onClick={() => {
              showSettingsTooltip(false);
              dispatch(
                showQuerySettingsModal(SettingsModalSource.QUERY_SETTINGS)
              );
            }}
          />
          <AnimatePresence>
            {settingsTooltip && (
              <TooltipMotion {...TOOLTIP_MOTION}>
                <Tooltip hasArrow={false} mode="light">
                  <TooltipContent color={colors.black[500]}>
                    {t('browser_query_menu.settings_tooltip')}
                  </TooltipContent>
                </Tooltip>
              </TooltipMotion>
            )}
          </AnimatePresence>
        </ActionsContainer>
        <ActionsContainer
          ref={actionsContainer}
          marginLeft={10}
          onMouseEnter={() => showActionsTooltip(true)}
          onMouseLeave={() => showActionsTooltip(false)}
        >
          <CircleButton
            icon={<Icon type="actions" />}
            onClick={() => {
              showActionsTooltip(false);
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
              onHideMenu={() => setActionsMenuVisibility(false)}
              onRemoveQuery={() => {
                setActionsMenuVisibility(false);
                onRemoveQuery();
              }}
            />
          </Dropdown>
          <AnimatePresence>
            {actionsTooltip && (
              <TooltipMotion {...TOOLTIP_MOTION}>
                <Tooltip hasArrow={false} mode="light">
                  <TooltipContent color={colors.black[500]}>
                    {t('browser_query_menu.actions_tooltip')}
                  </TooltipContent>
                </Tooltip>
              </TooltipMotion>
            )}
          </AnimatePresence>
        </ActionsContainer>
      </ContextActions>
    </Container>
  );
};

export default BrowserQueryMenu;
