import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { TabTypes } from '../../types';

export const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const tabVariants = {
  prop: 'type',
  variants: {
    default: {
      fontSize: 14,
    },
    large: {
      fontSize: 19,
    },
  },
};

export const Tab = styled.div<{
  type: TabTypes;
}>`
  ${variant(tabVariants)}
  padding: 10px 20px;
  flex-grow: 1;
  font-family: 'Lato Bold', sans-serif;
  color: ${colors.green[500]};
  text-align: center;
  cursor: pointer;

  ${(props) =>
    props.type === 'large' &&
    css`
      &:hover {
        background: ${transparentize(0.8, colors.green[100])};
      }
    `}
`;

export const ActiveTab = styled(motion.div)`
  height: 2px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: ${colors.green[500]};
`;
