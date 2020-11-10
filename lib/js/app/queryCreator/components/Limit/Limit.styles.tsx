import styled from 'styled-components';
import { motion } from 'framer-motion';
import { UI_LAYERS } from '@keen.io/ui-core';

export const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 100%;
  top: -50%;
  transform: translateX(10px) translateY(-10px);
  z-index: ${UI_LAYERS.tooltip};
`;
