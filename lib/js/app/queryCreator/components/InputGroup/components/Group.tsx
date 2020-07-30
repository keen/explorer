import React, { FC } from 'react';
import { Wrapper } from './Group.styles';

type Props = {
  /** Properties tree */
  // properties: Record<string, string[] | Object>;
  // /** Click event handler */
  // onClick: (e: React.MouseEvent<HTMLDivElement>, propertyPath: string) => void;
  // /** The curent active property */
  // activeProperty?: string;
  // /** Expand all tree levels */
  // expanded?: boolean;
  children: React.ReactNode;
};

const Group: FC<Props> = ({ children }) => {
  return (
    <Wrapper>{children}</Wrapper>
  );
};

export default Group;
