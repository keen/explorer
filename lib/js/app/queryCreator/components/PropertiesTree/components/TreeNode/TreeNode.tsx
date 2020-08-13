import React, { FC } from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Header, Title, MotionIcon } from './TreeNode.styles';

import { PADDING } from './constants';

type Props = {
  /** Node name */
  name: string;
  /** Open indicator */
  isOpen: boolean;
  /** Click event handler */
  onClick: () => void;
  /** Deepness level */
  deepnessLevel: number;
};

const TreeNode: FC<Props> = ({ name, deepnessLevel, isOpen, onClick }) => (
  <Header
    style={{ paddingLeft: PADDING + deepnessLevel * PADDING }}
    onClick={onClick}
  >
    <Title>{name}</Title>
    <MotionIcon
      initial={false}
      animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
    >
      <Icon type="caret-right" fill={colors.blue[500]} width={10} height={10} />
    </MotionIcon>
  </Header>
);

export default TreeNode;
