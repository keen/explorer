import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Container = styled.li<{
  isActive: boolean;
}>`
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 14px;
  font-family: 'Lato', sans-serif;
  color: ${colors.blue[500]};

  cursor: pointer;
  transition: background 0.2s linear;

  &:hover {
    background: ${transparentize(0.8, colors.green[100])};
  }

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.8, colors.green[100])};
    `}
`;

export const Hint = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const MotionIcon = styled(motion.div)`
  display: flex;
  align-items: center;
`;

export const TooltipContainer = styled(motion.div)`
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato', sans-serif;
  width: 145px;

  position: absolute;
  top: -7px;
  right: -11px;
  transform: translateX(100%);
`;
