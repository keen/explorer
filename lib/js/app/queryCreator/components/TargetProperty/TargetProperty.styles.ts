import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  position: relative;
`;

export const PropertyOverflow = styled.div`
  overflow: hidden;
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 100%;
  transform: translateX(0) translateY(5px);
`;
