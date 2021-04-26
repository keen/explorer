import React, { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toggle, Tooltip } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import TooltipContent from '../TooltipContent';
import {
  Container,
  HintContainer,
  Label,
  TooltipMotion,
} from './AutorunQuery.styles';

import { TOOLTIP_MOTION } from '../../constants';

type Props = {
  /** Toggle autorun event handler */
  onToggle: (autorun: boolean) => void;
  /** Autorun query indicator */
  autorun: boolean;
  /** Settings label */
  label: string;
  /** Autorun tooltip hint message */
  tooltipMessage: string;
};

const AutorunQuery: FC<Props> = ({
  autorun,
  label,
  tooltipMessage,
  onToggle,
}) => {
  const [showTooltip, setTooltipVisibility] = useState(false);

  return (
    <Container data-testid="autorun-query">
      <HintContainer
        data-testid="hint-container"
        onMouseEnter={() => setTooltipVisibility(true)}
        onMouseLeave={() => setTooltipVisibility(false)}
      >
        <Icon type="info" fill={colors.blue[500]} height={16} width={16} />
        <AnimatePresence>
          {showTooltip && (
            <TooltipMotion {...TOOLTIP_MOTION}>
              <Tooltip hasArrow={false}>
                <TooltipContent
                  width={120}
                  color={colors.black[100]}
                  enableWrap
                >
                  {tooltipMessage}
                </TooltipContent>
              </Tooltip>
            </TooltipMotion>
          )}
        </AnimatePresence>
      </HintContainer>
      <Label>{label}</Label>
      <Toggle isOn={autorun} onChange={onToggle} />
    </Container>
  );
};

export default AutorunQuery;
