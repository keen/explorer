import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { Position } from './types';

export const Container = styled.div`
  position: relative;
`;

type Props = {
  position: Position;
  width: number;
  height: number;
  tooltipWidth: number;
  tooltipHeight: number;
};

export const TooltipContainer = styled(motion.div)<Props>`
  position: absolute;
  pointer-events: none;
  z-index: 1;
  width: 258px;
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;

  ${(props) =>
    props.position === 'top' &&
    css`
      left: ${(props: Props) => -props.tooltipWidth / 2 + props.width / 2}px;
      top: ${(props) => -props.tooltipHeight - props.height / 2}px;
    `}

  ${(props) =>
    props.position === 'bottom' &&
    css`
      left: ${(props: Props) => -props.tooltipWidth / 2 + props.width / 2}px;
      top: ${(props) => props.height * 1.5}px;
    `}

  ${(props) =>
    props.position === 'left' &&
    css`
      left: ${(props: Props) => -props.tooltipWidth - props.width / 2}px;
      top: ${(props) => -props.tooltipHeight / 2 + props.height / 2}px;
    `}

  ${(props) =>
    props.position === 'right' &&
    css`
      left: ${(props: Props) => props.width * 1.5}px;
      top: ${(props) => -props.tooltipHeight / 2 + props.height / 2}px;
    `}
`;
