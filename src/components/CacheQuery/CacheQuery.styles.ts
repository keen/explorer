import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 4px;
  height: 40px;
`;

export const CacheSwitch = styled.label`
  display: flex;
  align-items: center;
  margin: 0;
  column-gap: 7px;
  cursor: pointer;
`;

export const LimitReached = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  position: relative;
  cursor: pointer;
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 25px;
  transform: translateX(-50%);
`;

export const CacheLimit = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxContainer = styled.div`
  line-height: 0;
`;
