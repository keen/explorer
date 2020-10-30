import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';
import { UI_LAYERS } from '@keen.io/ui-core';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  font-size: 14px;
  font-family: Lato Regular, sans-serif;
  line-height: 17px;
  color: ${colors.black[100]};
  margin-right: 10px;
`;

export const HintContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  position: relative;
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  top: 100%;
  z-index: ${UI_LAYERS.tooltip};
`;

export const TooltipContent = styled.div`
  width: 120px;
  color: ${colors.black[100]};
  font-size: 14px;
  font-family: Lato Regular, sans-serif;
`;
