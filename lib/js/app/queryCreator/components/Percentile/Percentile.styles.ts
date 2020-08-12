import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 68px;

  position: relative;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const TooltipContainer = styled(motion.div)`
  position: absolute;
  left: 70%;
  top: 70%;
  pointer-events: none;
  z-index: 1;
  width: 200px;
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
`;
