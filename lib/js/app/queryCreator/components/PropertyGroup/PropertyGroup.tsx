import React, { FC } from 'react';

import { Container } from './PropertyGroup.styles';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
  /** Active state indicator */
  isActive: boolean;
};

const PropertyGroup: FC<Props> = ({ children, isActive }) => (
  <Container isActive={isActive}>{children}</Container>
);

export default PropertyGroup;
