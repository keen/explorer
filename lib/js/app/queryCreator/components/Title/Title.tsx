import React, { FC } from 'react';

import { Container } from './Title.styles';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
  /** Disabled indicator */
  isDisabled?: boolean;
};

const Title: FC<Props> = ({ children, isDisabled }) => {
  return <Container isDisabled={isDisabled}>{children}</Container>;
};

export default Title;
