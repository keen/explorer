import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';
import { UI_LAYERS } from '@keen.io/ui-core';

export const LimitContainer = styled.div`
  margin-top: 10px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LimitInput = styled.div`
  position: relative;
  max-width: 100px;
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 0%;
  top: 100%;
  width: 320px;
  z-index: ${UI_LAYERS.tooltip};
`;

export const HintMessage = styled.div`
  color: ${colors.white[500]};
  font-size: 14px;
  font-family: 'Lato Regular', sans-serif;
  line-height: 16px;
`;

export const TooltipContainer = styled.div`
  display: inline-block;
  margin-left: 10px;
  position: relative;
  cursor: pointer;
`;
