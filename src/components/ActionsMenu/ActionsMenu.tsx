import React, { FC, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DropdownMenu, Tooltip } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { getQueryResults, queriesActions } from '../../modules/queries';
import { AppContext } from '../../contexts';

import TooltipContent from '../TooltipContent';

import {
  Container,
  DeleteQueryItem,
  MutedText,
  ExportDataWrapper,
  ExportDataLinks,
  TooltipMotion,
} from './ActionsMenu.styles';

import {
  showEmbedModal,
  copyApiResourceUrl,
  createNewQuery,
} from '../../modules/app';

import { TOOLTIP_MOTION } from '../../constants';
import { DEFAULT_IMAGE_QUALITY } from './constants';
import { dataExportActions } from '../../modules/dataExport';

type Props = {
  /** Is new query */
  isNewQuery: boolean;
  /** Is inside query browser */
  isInsideQueryBrowser?: boolean;
  /** Remove query event handler */
  onRemoveQuery: () => void;
  /** Hide menu */
  onHideMenu: () => void;
  /** Visibility indicator  */
  isVisible?: boolean;
  /** Is query editable **/
  isQueryEditable?: boolean;
  /** Is multi-analysis query */
  isMultiAnalysisQuery?: boolean;
};

const ActionsMenu: FC<Props> = ({
  isNewQuery,
  isInsideQueryBrowser,
  isVisible,
  isQueryEditable = true,
  isMultiAnalysisQuery = false,
  onRemoveQuery,
  onHideMenu,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const queryResults = useSelector(getQueryResults);
  const [tooltip, showTooltip] = useState(false);
  const {
    keenAnalysis: { config },
  } = useContext(AppContext);

  return (
    <Container>
      {isQueryEditable ? (
        <DropdownMenu.Container>
          <MutedText>{t('actions_menu.export_result')}</MutedText>
          <ExportDataWrapper
            onMouseEnter={() => {
              if (isVisible && !queryResults) {
                showTooltip(true);
              }
            }}
            onMouseLeave={() => tooltip && isVisible && showTooltip(false)}
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
                  dispatch(
                    dataExportActions.exportChartToImage(
                      DEFAULT_IMAGE_QUALITY,
                      colors.white[500]
                    )
                  );
                  onHideMenu();
                }}
              >
                {t('actions_menu.image')}
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => {
                  dispatch(dataExportActions.exportChartToJSON());
                  onHideMenu();
                }}
              >
                {t('actions_menu.json')}
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => {
                  dispatch(dataExportActions.showCSVExportModal(true));
                  onHideMenu();
                }}
              >
                {t('actions_menu.csv')}
              </DropdownMenu.Item>
            </ExportDataLinks>
          </ExportDataWrapper>
          <DropdownMenu.Divider />
          {!isNewQuery && !isInsideQueryBrowser && (
            <DropdownMenu.Item
              onClick={() => {
                dispatch(createNewQuery());
                onHideMenu();
              }}
            >
              {t('actions_menu.new_query')}
            </DropdownMenu.Item>
          )}
          {!isNewQuery && !isMultiAnalysisQuery && (
            <DropdownMenu.Item
              onClick={() => {
                dispatch(queriesActions.cloneSavedQuery());
                onHideMenu();
              }}
            >
              {t('actions_menu.clone_query')}
            </DropdownMenu.Item>
          )}
          {!isNewQuery && (
            <DropdownMenu.Item
              onClick={() => {
                onRemoveQuery();
                onHideMenu();
              }}
            >
              <DeleteQueryItem>
                {t('actions_menu.delete_query')}
              </DeleteQueryItem>
            </DropdownMenu.Item>
          )}
          {!isNewQuery && <DropdownMenu.Divider />}
          <DropdownMenu.Item
            onClick={() => {
              dispatch(copyApiResourceUrl(config));
              onHideMenu();
            }}
          >
            {t('actions_menu.api_resource')}
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
      ) : (
        <DropdownMenu.Container>
          {!isNewQuery && (
            <DropdownMenu.Item
              onClick={() => {
                onRemoveQuery();
                onHideMenu();
              }}
            >
              <DeleteQueryItem>
                {t('actions_menu.delete_query')}
              </DeleteQueryItem>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Container>
      )}
    </Container>
  );
};

export default ActionsMenu;
