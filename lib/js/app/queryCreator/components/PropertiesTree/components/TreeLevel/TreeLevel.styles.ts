import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Header = styled.div`
  font-family: Lato Bold, sans-serif;
  font-size: 14px;
  line-height: 30px;
  color: ${colors.blue[500]};

  display: flex;
  cursor: pointer;
`;

export const MotionIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-left: 4px;
`;
