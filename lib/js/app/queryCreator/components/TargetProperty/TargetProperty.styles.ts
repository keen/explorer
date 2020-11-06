import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  position: relative;
`;

export const PropertyOverflow = styled.div`
  overflow: hidden;
`;

export const TooltipContent = styled.div`
  width: 220px;
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  color: ${colors.white[500]};
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 100%;
  transform: translateX(0) translateY(5px);
`;
