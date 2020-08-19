import styled from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  position: relative;
  display: flex;
  padding: 10px 14px;
  height: 37px;
  width: 100px;
  box-sizing: border-box;
  border: 1px solid ${transparentize(0.5, colors.black[500])};
  border-radius: 4px;
  outline: none;

  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
`;

export const Units = styled.div`
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
  color: ${transparentize(0.5, colors.blue[500])};
`;

export const Input = styled.input`
  outline: none;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.blue[500]};
  width: 25px;

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const TooltipContent = styled.div`
  width: 220px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.white[500]};
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 100%;
  top: -50%;
  transform: translateX(-10px) translateY(-10px);
`;
