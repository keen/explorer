import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownMenu, Tooltip } from '@keen.io/ui-core';
import { AnimatePresence } from 'framer-motion';

import { getQueryResults } from '../../modules/queries';

import {
  Container,
  DeleteQueryItem,
  MutedText,
  ExportDataWrapper,
  ExportDataLinks,
  TooltipContent,
  TooltipMotion,
} from './ActionsMenu.styles';
import text from './text.json';

import {
  shareQueryUrl,
  exportChartToImage,
  exportChartToJson,
} from '../../modules/app';

type Props = {
  /** Is new query */
  isNewQuery: boolean;
  /** Remove query event handler */
  onRemoveQuery: () => void;
  /** Share query event handler */
  onShareQuery?: () => void;
};

const tooltipMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const ActionsMenu: FC<Props> = ({
  isNewQuery,
  onShareQuery,
  onRemoveQuery,
}) => {
  const dispatch = useDispatch();
  const queryResults = useSelector(getQueryResults);
  const [tooltip, showTooltip] = useState(false);
  return (
    <Container>
      <DropdownMenu.Container>
        <MutedText>{text.exportResult}</MutedText>
        <ExportDataWrapper
          onMouseEnter={() => !queryResults && showTooltip(true)}
          onMouseLeave={() => tooltip && showTooltip(false)}
        >
          <AnimatePresence>
            {tooltip && (
              <TooltipMotion {...tooltipMotion}>
                <Tooltip hasArrow={false} mode="dark">
                  <TooltipContent>{text.tooltip}</TooltipContent>
                </Tooltip>
              </TooltipMotion>
            )}
          </AnimatePresence>
          <ExportDataLinks isActive={queryResults}>
            <DropdownMenu.Item onClick={() => dispatch(exportChartToImage())}>
              {text.image}
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => dispatch(exportChartToJson())}>
              {text.json}
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => console.log('generate csv')}>
              {text.csv}
            </DropdownMenu.Item>
          </ExportDataLinks>
        </ExportDataWrapper>
        <DropdownMenu.Divider />
        {!isNewQuery && (
          <DropdownMenu.Item onClick={onRemoveQuery}>
            <DeleteQueryItem>{text.deleteQuery}</DeleteQueryItem>
          </DropdownMenu.Item>
        )}
        {!isNewQuery && <DropdownMenu.Divider />}
        <DropdownMenu.Item
          onClick={() => {
            onShareQuery && onShareQuery();
            dispatch(shareQueryUrl());
          }}
        >
          {text.shareQuery}
        </DropdownMenu.Item>
      </DropdownMenu.Container>
    </Container>
  );
};

export default ActionsMenu;
