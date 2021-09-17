import { motion } from 'framer-motion';
import styled from 'styled-components';
import { UI_LAYERS } from '@keen.io/ui-core';

export const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  top: 100%;
  z-index: ${UI_LAYERS.tooltip};
`;

export const HintContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
`;

export const IconContainer = styled.div`
  line-height: 1;
  cursor: pointer;
`;
