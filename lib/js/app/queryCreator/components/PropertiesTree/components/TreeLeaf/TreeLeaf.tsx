import React, { FC } from 'react';

import { Container, Type } from './TreeLeaf.styles';

import { PADDING } from '../../constants';

type Props = {
  /** Property name */
  name: string;
  /** Property type */
  type: string;
  /** Padding space */
  padding: number;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const TreeLeaf: FC<Props> = ({ padding, onClick, name, type }) => {
  return (
    <Container
      style={{
        paddingLeft: padding,
        paddingRight: PADDING,
        paddingTop: 7,
        paddingBottom: 7,
      }}
      onClick={onClick}
    >
      {name}
      <Type>{type}</Type>
    </Container>
  );
};

export default TreeLeaf;
