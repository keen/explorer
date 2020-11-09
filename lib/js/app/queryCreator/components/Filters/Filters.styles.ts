import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { UI_LAYERS } from '@keen.io/ui-core';

export const Operator = styled.div`
  margin: 6px 0;
`;

export const FiltersSettings = styled.div`
  margin-bottom: 20px;
`;

export const ActionContainer = styled.div<{ hasSpacing: boolean }>`
  ${(props) =>
    props.hasSpacing &&
    css`
      margin-top: 5px;
    `};
`;

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 100%;
  top: -50%;
  transform: translateX(10px) translateY(-10px);
  z-index: ${UI_LAYERS.tooltip};
`;
