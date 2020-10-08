import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const LimitContainer = styled.div`
  margin-top: 10px;
`;

export const LimitInput = styled.div`
  position: relative;
  max-width: 100px;
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 100%;
  top: -50%;
  transform: translateX(-10px) translateY(-10px);
  width: 320px;
`;

export const HintMessage = styled.div`
  color: ${colors.white[500]};
  font-size: 14px;
  font-family: 'Lato Regular', sans-serif;
  line-height: 16px;
`;
