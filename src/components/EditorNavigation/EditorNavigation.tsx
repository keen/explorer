import React, { FC, useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Badge,
  CircleButton,
  Dropdown,
  FadeLoader,
  MousePositionedTooltip,
} from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';
import { Headline, BodyText } from '@keen.io/typography';

import TooltipContent from '../TooltipContent';
import {
  Container,
  QueryName,
  QueryMeta,
  Menu,
  MenuItem,
  BackLink,
  BackLinkText,
  WrapperHorizontal,
  WrapperVertical,
  ButtonLabel,
} from './EditorNavigation.styles';

import ActionsMenu from '../ActionsMenu';

import { getQueriesSaving, queriesActions } from '../../modules/queries';

import {
  savedQueryActions,
  savedQuerySelectors,
} from '../../modules/savedQuery';
import { validateDashboardsConnections } from '../../modules/app/actions';
import {
  appActions,
  appSelectors,
  SettingsModalSource,
} from '../../modules/app';

const actionsDropdownMotion = {
  initial: { opacity: 0, top: 20, left: -10 },
  animate: { opacity: 1, top: 2, left: -10 },
  exit: { opacity: 0, top: 30, left: -10 },
};

const iconVariants = {
  initial: { x: 0 },
  hover: { x: -5 },
};
const menuTooltip = (text: string) => (
  <TooltipContent color={colors.black[500]}>{text}</TooltipContent>
);

const EditorNavigation: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const actionsContainer = useRef(null);

  const [actionsMenu, setActionsMenuVisibility] = useState(false);

  const {
    exists,
    displayName,
    name,
    refreshRate,
    tags,
    cached,
    isCloned,
  } = useSelector(savedQuerySelectors.getSavedQuery);
  const isSavingQuery = useSelector(getQueriesSaving);
  const isModalVisible = useSelector(
    appSelectors.getQuerySettingsModalVisibility
  );
  const isConnectedDashboardsLoading = useSelector(
    savedQuerySelectors.getConnectedDashboardsLoading
  );

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

  const queryName = displayName ? displayName : t('editor.new_query_title');

  const handleSaveQuery = () => {
    if (!exists && !isCloned) {
      dispatch(
        appActions.showQuerySettingsModal({
          source: SettingsModalSource.FIRST_QUERY_SAVE,
        })
      );
    } else {
      dispatch(validateDashboardsConnections());
    }
  };

  useEffect(() => {
    dispatch(savedQueryActions.resetConnectedDashboards());
  }, []);

  return (
    <Container>
      <WrapperVertical>
        <WrapperHorizontal>
          <QueryName title={queryName}>
            <Headline variant="h3" color={colors.blue[500]} enableTextEllipsis>
              {queryName}
            </Headline>
          </QueryName>
          <QueryMeta>
            {cached && (
              <Badge variant="green" truncate>
                <span data-testid="cache-badge">
                  {t('editor_navigation.cached_label')}
                </span>{' '}
                {`(${refreshRate}${t('editor_navigation.cache_units')})`}
              </Badge>
            )}
            {tags.map((tag) => (
              <Badge key={tag} variant="purple" truncate>
                {tag}
              </Badge>
            ))}
          </QueryMeta>
        </WrapperHorizontal>
        <BackLink
          onClick={() => dispatch(appActions.switchToQueriesList())}
          whileHover="hover"
          initial="initial"
          animate="initial"
        >
          <motion.div variants={iconVariants}>
            <Icon type="button-arrow-left" fill={colors.blue[300]} />
          </motion.div>
          <BackLinkText>
            <BodyText variant="body2" color={colors.blue[200]}>
              {t('editor.back_to_saved_queries')}
            </BodyText>
          </BackLinkText>
        </BackLink>
      </WrapperVertical>
      <Menu>
        <MousePositionedTooltip
          isActive={!actionsMenu}
          tooltipPinPlacement="bottom-left"
          renderContent={() => menuTooltip(t('editor.settings_tooltip'))}
        >
          <MenuItem position="relative">
            <CircleButton
              variant="secondary"
              icon={
                <span data-testid="query-settings">
                  <Icon type="settings" />
                </span>
              }
              onClick={() => {
                dispatch(
                  appActions.showQuerySettingsModal({
                    source: SettingsModalSource.QUERY_SETTINGS,
                  })
                );
              }}
            />
          </MenuItem>
        </MousePositionedTooltip>

        <MousePositionedTooltip
          isActive={!actionsMenu}
          tooltipPinPlacement="bottom-left"
          renderContent={() => menuTooltip(t('actions_menu.share_query'))}
        >
          <MenuItem position="relative" data-testid="share-query">
            <CircleButton
              variant="secondary"
              icon={
                <span>
                  <Icon type="share" />
                </span>
              }
              onClick={() => {
                dispatch(appActions.shareQueryUrl());
              }}
            />
          </MenuItem>
        </MousePositionedTooltip>
        <MousePositionedTooltip
          key={`actions-tooltip-${actionsMenu}`}
          isActive={!actionsMenu}
          tooltipPinPlacement="bottom-left"
          renderContent={() => menuTooltip(t('editor.actions_tooltip'))}
        >
          <MenuItem position="relative" ref={actionsContainer}>
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
                isNewQuery={!exists}
                isVisible={actionsMenu}
                onHideMenu={() => setActionsMenuVisibility(false)}
                onRemoveQuery={() => {
                  setActionsMenuVisibility(false);
                  dispatch(queriesActions.deleteQuery(name));
                }}
              />
            </Dropdown>
          </MenuItem>
        </MousePositionedTooltip>
        <MenuItem>
          <Button
            data-testid="save-query"
            variant="secondary"
            style="solid"
            isDisabled={isSavingQuery || isConnectedDashboardsLoading}
            onClick={handleSaveQuery}
            icon={
              (isSavingQuery || isConnectedDashboardsLoading) &&
              !isModalVisible && <FadeLoader />
            }
          >
            <ButtonLabel>
              {exists
                ? t('editor.update_query_button')
                : t('editor.save_query_button')}
            </ButtonLabel>
          </Button>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default EditorNavigation;
