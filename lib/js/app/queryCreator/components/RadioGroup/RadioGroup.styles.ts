import styled from 'styled-components';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: inline-flex;
  align-items: center;

  background-color: ${transparentize(0.85, colors.blue['100'])};

  border-radius: 4px;
  position: relative;
`;

export const StyledLabel = styled.label`
  margin: 0;
  padding: 10px 14px;

  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;

  color: ${colors.blue['500']};

  cursor: pointer;
`;

export const Radio = styled.div`
  display: flex;
  position: relative;
  z-index: 10;
  overflow: hidden;
`;

export const StyledInput = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Marker = styled(motion.div)`
  position: absolute;
  left: 0;
  z-index: 1;

  border-radius: 4px;
  background-color: ${transparentize(0.2, colors.green['100'])};
`;
