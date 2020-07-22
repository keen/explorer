import React, { FC } from 'react';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
};

const Label: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Label;
