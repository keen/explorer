import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Container = styled.li`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.blue[500]};

  cursor: pointer;
  transition: background 0.2s linear;

  &:hover {
    background: ${colors.gray[400]};
  }
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

export const Message = styled(motion.div)`
  padding: 10px;
  width: 160px;
  background: ${colors.gray[400]};
  position: absolute;
  top: -7px;
  right: -11px;
  transform: translateX(100%);
`;
