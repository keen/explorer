import React, { FC } from 'react';

import { Container } from './Title.styles';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
  /** Click event handler */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Disabled indicator */
  isDisabled?: boolean;
};

const Title: FC<Props> = ({ children, onClick, isDisabled }) => {
  return (
    <Container
      onClick={(e) => {
        if (onClick && !isDisabled) onClick(e);
      }}
      isDisabled={isDisabled}
    >
      {children}
    </Container>
  );
};

export default Title;
