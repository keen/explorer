import React, { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Tooltip } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import {
  Container,
  MotionIcon,
  Hint,
  TooltipContainer,
} from './ListItem.styles';

import { Analysis } from '../../../../types';

type Props = {
  /** Analysis value */
  analysis: Analysis;
  /** Analysis description */
  description: string;
  /** Active indicator */
  isActive: boolean;
  /** Mouse enter event handler */
  onMouseEnter: (e: React.MouseEvent<HTMLLIElement>) => void;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLLIElement>, analysis: Analysis) => void;
  /** React children nodes */
  children: React.ReactNode;
};

const hintMotion = {
  initial: { opacity: 0, right: -24 },
  animate: { opacity: 1, right: -15 },
  exit: { opacity: 0 },
};

const iconMotion = {
  initial: { opacity: 0, left: -5 },
  animate: { opacity: 1, left: 0 },
  exit: { opacity: 0 },
  transition: { delay: 0.1 },
};

const ListItem: FC<Props> = ({
  children,
  onClick,
  onMouseEnter,
  isActive,
  analysis,
  description,
}) => {
  const [isFocused, setFocus] = useState(false);
  const [hint, showHint] = useState(false);

  return (
    <Container
      onClick={(e) => onClick(e, analysis)}
      isActive={isActive}
      onMouseEnter={(e) => {
        onMouseEnter(e);
        setFocus(true);
      }}
      onMouseLeave={() => setFocus(false)}
    >
      <div>{children}</div>
      <AnimatePresence>
        <Hint
          onMouseEnter={(e) => showHint(true)}
          onMouseLeave={() => showHint(false)}
        >
          {isFocused && (
            <MotionIcon data-testid="hint-icon" key="hint-icon" {...iconMotion}>
              <Icon
                type="info"
                width={15}
                height={15}
                fill={colors.blue[500]}
              />
            </MotionIcon>
          )}
          {hint && (
            <TooltipContainer
              data-testid="hint-message"
              key="tooltip-container"
              {...hintMotion}
            >
              <Tooltip mode="dark" hasArrow={false}>
                {description}
              </Tooltip>
            </TooltipContainer>
          )}
        </Hint>
      </AnimatePresence>
    </Container>
  );
};

export default ListItem;
