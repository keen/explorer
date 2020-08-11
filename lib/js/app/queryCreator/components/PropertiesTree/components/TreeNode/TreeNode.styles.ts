import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Header = styled.div`
  font-family: Lato Bold, sans-serif;
  font-size: 14px;
  height: 36px;
  color: ${colors.blue[500]};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MotionIcon = styled(motion.div)`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-left: 4px;
`;
