import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

import { MAX_WIDTH } from './constants';

export const ValueContainer = styled(motion.div)`
  padding: 10px 14px;
  height: 37px;
  box-sizing: border-box;

  max-width: ${MAX_WIDTH}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.blue[500]};
`;

export const MotionPropertyItem = styled(motion.div)`
  border-left: solid 1px ${colors.white[500]};
`;
