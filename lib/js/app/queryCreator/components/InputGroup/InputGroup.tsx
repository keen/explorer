import React, { FC } from 'react';

import { Container } from './InputGroup.styles';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
};

const InputGroup: FC<Props> = ({
  children,
}) => {

  return (
    <Container>{children}</Container>
  );
}

export default InputGroup;
