import React, { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import { Container, MotionIcon, Hint, Message } from './Item.styles';

import { Analysis } from '../../../types';

type Props = {
  /** Analysis value */
  analysis: Analysis;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLLIElement>, analysis: Analysis) => void;
  /** React children nodes */
  children: React.ReactNode;
};

const hintMotion = {
  initial: { opacity: 0, right: -22 },
  animate: { opacity: 1, right: -11 },
  exit: { opacity: 0 },
};

const iconMotion = {
  initial: { opacity: 0, left: -5 },
  animate: { opacity: 1, left: 0 },
  exit: { opacity: 0 },
  transition: { delay: 0.1 },
};

const Item: FC<Props> = ({ children, onClick, analysis }) => {
  const [isActive, setActive] = useState(false);
  const [hint, showHint] = useState(false);

  return (
    <Container
      onClick={(e) => onClick(e, analysis)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div>{children}</div>
      <AnimatePresence>
        <Hint
          onMouseEnter={() => showHint(true)}
          onMouseLeave={() => showHint(false)}
        >
          {isActive && (
            <MotionIcon key="hint-icon" {...iconMotion}>
              <Icon
                type="info"
                width={15}
                height={15}
                fill={colors.blue[500]}
              />
            </MotionIcon>
          )}
          {hint && (
            <Message key="hint-message" {...hintMotion}>
              lorem ipsum dolor sit amet
            </Message>
          )}
        </Hint>
      </AnimatePresence>
    </Container>
  );
};

export default Item;
