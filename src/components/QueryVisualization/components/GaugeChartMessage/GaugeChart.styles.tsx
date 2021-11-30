import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const VisualizationMessage = styled(motion.div)`
  background: ${colors.white[500]};
  padding: 20px;
  display: inline;
  box-shadow: 0 10px 24px rgba(29, 39, 41, 0.15);
`;

export const VisualizationMessageWrapper = styled.div`
  width: 100%;
  opacity: 0.95;
  position: absolute;
  top: 60px;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

export const GoToSection = styled.span`
  cursor: pointer;
  color: ${colors.green[500]};
  font-weight: bold;
`;
