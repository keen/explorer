import React, { FC } from 'react';
import { AnimatePresence } from 'framer-motion';

import { MotionContainer } from './CreateFirstQuery.styles';
import text from './text.json';

type Props = {
  /** Visibility indicator */
  isVisible: boolean;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const modalMotion = {
  initial: { top: 100, left: '50%', opacity: 0, translateX: '-50%' },
  animate: { top: 50, left: '50%', opacity: 1, translateX: '-50%' },
  exit: {},
};

const CreateFirstQuery: FC<Props> = ({ isVisible, onClick }) => (
  <AnimatePresence>
    {isVisible && (
      <MotionContainer
        {...modalMotion}
        onClick={onClick}
        width={{ xs: 300, sm: 500 }}
        padding={{ xs: 20, sm: '20px 80px' }}
        data-testid="create-first-query"
      >
        <div>{text.title}</div>
        <div>{text.subtitle}</div>
      </MotionContainer>
    )}
  </AnimatePresence>
);

export default CreateFirstQuery;
