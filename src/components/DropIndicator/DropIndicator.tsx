import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Container } from './DropIndicator.styles';

type Props = {
  /** Active state indicator */
  isActive?: boolean;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

const DropIndicator: FC<Props> = ({ onClick, isActive }) => (
  <Container onClick={onClick} data-testid="drop-indicator">
    <motion.span
      transition={{ duration: 0.3 }}
      animate={
        isActive
          ? {
              rotate: 180,
            }
          : {
              rotate: 0,
            }
      }
    >
      <Icon type="caret-down" fill={colors.blue[500]} width={10} height={10} />
    </motion.span>
  </Container>
);

export default DropIndicator;
