import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Container = styled.li<{
  isActive: boolean;
}>`
  padding: 8px 14px;
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
  display: flex;
  align-items: center;
`;

export const MotionIcon = styled(motion.div)`
  display: flex;
  align-items: center;
`;
