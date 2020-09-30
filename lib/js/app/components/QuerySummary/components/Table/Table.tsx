import React, { FC } from 'react';

import { StyledTable } from './Table.styles';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
};

export const Table: FC<Props> = ({ children }) => (
  <StyledTable>{children}</StyledTable>
);

export default Table;
