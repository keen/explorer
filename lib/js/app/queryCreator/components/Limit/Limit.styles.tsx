import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';
import { UI_LAYERS } from '@keen.io/ui-core';

export const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const TooltipContent = styled.div`
  width: 220px;
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  color: ${colors.white[500]};
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 100%;
  top: -50%;
  transform: translateX(10px) translateY(-10px);
  z-index: ${UI_LAYERS.tooltip};
`;
