import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

import { MotionContainer } from './CreateFirstQuery.styles';

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

const CreateFirstQuery: FC<Props> = ({ isVisible, onClick }) => {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isVisible && (
        <MotionContainer
          {...modalMotion}
          onClick={onClick}
          width={{ xs: 300, sm: 500 }}
          padding={{ xs: 20, sm: '20px 80px' }}
          data-testid="create-first-query"
        >
          <div>{t('browser_empty_project.title')}</div>
          <div>{t('browser_empty_project.subtitle')}</div>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};
export default CreateFirstQuery;
