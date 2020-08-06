import React, { FC } from 'react';
import { Wrapper } from './Group.styles';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
};

const Group: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Group;
