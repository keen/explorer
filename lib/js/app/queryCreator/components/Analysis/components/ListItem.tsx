import React, { FC, useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import { Container, MotionIcon, Hint } from './ListItem.styles';

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
  /** Show hint handler */
  showHint: (value: boolean, topPos?: number, bottomPos?: number) => void;
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
  showHint,
}) => {
  const [isFocused, setFocus] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    bottom: 0,
  });
  const elementRef = useRef(null);

  useEffect(() => {
    const { offsetTop: top, clientHeight: height } = elementRef.current;
    setPosition({ top, bottom: top + height });
  }, [elementRef]);

  const { top, bottom } = position;

  return (
    <Container
      ref={elementRef}
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
          onMouseEnter={() => showHint(true, top, bottom)}
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
        </Hint>
      </AnimatePresence>
    </Container>
  );
};

export default ListItem;
