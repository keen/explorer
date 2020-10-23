import React, { FC, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'fram-er-motion';
import { useTranslation } from 'react-i18next';
import { DropdownMenu, Tooltip } from '@keen.io/ui-core';

import { getQueryResults, cloneSavedQuery } from '../../modules/queries';
import { AppContext } from '../../contexts';

import {
  Container,
  DeleteQueryItem,
  MutedText,
  ExportDataWrapper,
  ExportDataLinks,
  TooltipContent,
  TooltipMotion,
} from './ActionsMenu.styles';

import {
  shareQueryUrl,
  exportChartToImage,
  exportChartToJson,
  exportDataToCsv,
  showEmbedModal,
  copyApiResourceUrl,
} from '../../modules/app';

import { TOOLTIP_MOTION } from '../../constants';
import text from './text.json';

type Props = {
  /** Is new query */
  isNewQuery: boolean;
  /** Remove query event handler */
  onRemoveQuery: () => void;
  /** Hide menu */
  onHideMenu: () => void;
};

const ActionsMenu: FC<Props> = ({ isNewQuery, onRemoveQuery, onHideMenu }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const queryResults = useSelector(getQueryResults);
  const [tooltip, showTooltip] = useState(false);
  const {
    keenAnalysis: { config },
  } = useContext(AppContext);
  return (
    <Container>
      <DropdownMenu.Container>
        <MutedText>{t('actions_menu.export_result')}</MutedText>
        <ExportDataWrapper
          onMouseEnter={() => !queryResults && showTooltip(true)}
          onMouseLeave={() => tooltip && showTooltip(false)}
        >
          <AnimatePresence>
            {tooltip && (
              <TooltipMotion {...TOOLTIP_MOTION}>
                <Tooltip hasArrow={false} mode="dark">
                  <TooltipContent>{t('actions_menu.tooltip')}</TooltipContent>
                </Tooltip>
              </TooltipMotion>
            )}
          </AnimatePresence>
          <ExportDataLinks isActive={queryResults}>
            <DropdownMenu.Item
              onClick={() => {
                dispatch(exportChartToImage());
                onHideMenu();
              }}
            >
              {t('actions_menu.image')}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => {
                dispatch(exportChartToJson());
                onHideMenu();
              }}
            >
              {t('actions_menu.json')}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => {
                dispatch(exportDataToCsv());
                onHideMenu();
              }}
            >
              {t('actions_menu.csv')}
            </DropdownMenu.Item>
          </ExportDataLinks>
        </ExportDataWrapper>
        <DropdownMenu.Divider />
        {!isNewQuery && (
          <DropdownMenu.Item
            onClick={() => {
              dispatch(cloneSavedQuery());
              onHideMenu();
            }}
          >
            {text.cloneQuery}
          </DropdownMenu.Item>
        )}
        {!isNewQuery && (
          <DropdownMenu.Item
            onClick={() => {
              onRemoveQuery();
              onHideMenu();
            }}
          >
            <DeleteQueryItem>{t('actions_menu.delete_query')}</DeleteQueryItem>
          </DropdownMenu.Item>
        )}
        {!isNewQuery && <DropdownMenu.Divider />}
        <DropdownMenu.Item
          onClick={() => {
            dispatch(shareQueryUrl());
            onHideMenu();
          }}
        >
          {t('actions_menu.share_query')}
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() => {
            dispatch(copyApiResourceUrl(config));
            onHideMenu();
          }}
        >
          {text.apiResource}
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() => {
            dispatch(showEmbedModal());
            onHideMenu();
          }}
        >
          {t('actions_menu.embed_html')}
        </DropdownMenu.Item>
      </DropdownMenu.Container>
    </Container>
  );
};

export default ActionsMenu;
