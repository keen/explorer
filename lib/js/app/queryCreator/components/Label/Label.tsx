import React, { FC } from 'react';

import { Container } from './Label.styles';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
};

const Label: FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Label;
