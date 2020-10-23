import React, { FC, useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Badge,
  CircleButton,
  Dropdown,
  Tooltip,
  FadeLoader,
} from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';

import {
  Container,
  QueryName,
  QueryMeta,
  Tag,
  Menu,
  MenuItem,
  TooltipMotion,
  TooltipContent,
  BackLink,
  BackLinkText,
  WrapperHorizontal,
  WrapperVertical,
} from './EditorNavigation.styles';
import text from './text.json';

import ActionsMenu from '../ActionsMenu';

import { getSavedQuery } from '../../modules/savedQuery';
import { getQueriesSaving, deleteQuery } from '../../modules/queries';
import {
  showQuerySettingsModal,
  switchToQueriesList,
  getQuerySettingsModalVisibility,
  SettingsModalSource,
} from '../../modules/app';
import { colors } from '@keen.io/colors';

import { TOOLTIP_MOTION } from '../../constants';

const actionsDropdownMotion = {
  initial: { opacity: 0, top: 20, left: -10 },
  animate: { opacity: 1, top: 2, left: -10 },
  exit: { opacity: 0, top: 30, left: -10 },
};

type Props = {
  /** Save query event handler*/
  onSaveQuery: () => void;
};

const iconVariants = {
  initial: { x: 0 },
  hover: { x: -5 },
};

const EditorNavigation: FC<Props> = ({ onSaveQuery }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const actionsContainer = useRef(null);

  const [actionsMenu, setActionsMenuVisibility] = useState(false);
  const [actionsTooltip, showActionsTooltip] = useState(false);
  const [settingsTooltip, showSettingsTooltip] = useState(false);
  const { exists, displayName, name, refreshRate, tags, cached } = useSelector(
    getSavedQuery
  );
  const isSavingQuery = useSelector(getQueriesSaving);
  const isModalVisible = useSelector(getQuerySettingsModalVisibility);

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
      <WrapperVertical>
        <WrapperHorizontal>
          <QueryName>
            {displayName ? displayName : t('editor.new_query_title')}
          </QueryName>
          <QueryMeta>
            {cached && (
              <Tag>
                <Badge variant="green">
                  <span data-testid="cache-badge">{text.cachedLabel}</span>{' '}
                  {`(${refreshRate}${text.cacheUnits})`}
                </Badge>
              </Tag>
            )}
            {tags.map((tag) => (
              <Tag key={tag}>
                <Badge variant="purple">{tag}</Badge>
              </Tag>
            ))}
          </QueryMeta>
        </WrapperHorizontal>
        <BackLink
          onClick={() => dispatch(switchToQueriesList())}
          whileHover="hover"
          initial="initial"
          animate="initial"
        >
          <motion.div variants={iconVariants}>
            <Icon type="button-arrow-left" fill={colors.blue[300]} />
          </motion.div>
          <BackLinkText>{t('editor.back_to_saved_queries')}</BackLinkText>
        </BackLink>
      </WrapperVertical>
      <Menu>
        <MenuItem
          position="relative"
          onMouseEnter={() => showSettingsTooltip(true)}
          onMouseLeave={() => showSettingsTooltip(false)}
        >
          <CircleButton
            icon={
              <span data-testid="query-settings">
                <Icon type="settings" />
              </span>
            }
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
                  <TooltipContent>
                    {t('editor.settings_tooltip')}
                  </TooltipContent>
                </Tooltip>
              </TooltipMotion>
            )}
          </AnimatePresence>
        </MenuItem>
        <MenuItem position="relative" ref={actionsContainer}>
          <div
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
          </div>
          <Dropdown
            isOpen={actionsMenu}
            fullWidth={false}
            motion={actionsDropdownMotion}
          >
            <ActionsMenu
              isNewQuery={!exists}
              onHideMenu={() => setActionsMenuVisibility(false)}
              onRemoveQuery={() => {
                setActionsMenuVisibility(false);
                dispatch(deleteQuery(name));
              }}
            />
          </Dropdown>
          <AnimatePresence>
            {actionsTooltip && (
              <TooltipMotion {...TOOLTIP_MOTION}>
                <Tooltip hasArrow={false} mode="light">
                  <TooltipContent>{t('editor.actions_tooltip')}</TooltipContent>
                </Tooltip>
              </TooltipMotion>
            )}
          </AnimatePresence>
        </MenuItem>
        <MenuItem>
          <Button
            data-testid="save-query"
            variant="secondary"
            style="solid"
            isDisabled={isSavingQuery}
            onClick={() => {
              if (!exists) {
                dispatch(
                  showQuerySettingsModal(SettingsModalSource.FIRST_QUERY_SAVE)
                );
              } else {
                onSaveQuery();
              }
            }}
            icon={isSavingQuery && !isModalVisible && <FadeLoader />}
          >
            {t('editor.save_query_button')}
          </Button>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default EditorNavigation;
