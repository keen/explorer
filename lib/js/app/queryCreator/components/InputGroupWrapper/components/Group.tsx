import React, { FC } from 'react';
import { Wrapper } from './Group.styles';

type Props = {
  children: React.ReactNode;
  disableBackground?: boolean;
};

const Group: FC<Props> = ({ children, disableBackground }) => {
  return (
    <Wrapper disableBackground={disableBackground}>{children}</Wrapper>
  );
};

export default Group;
