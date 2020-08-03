import React, { FC } from 'react';
import { Wrapper } from './Group.styles';

type Props = {
  children: React.ReactNode;
};

const Group: FC<Props> = ({ children }) => {
  return (
    <Wrapper>{children}</Wrapper>
  );
};

export default Group;
