import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const CacheLabel = styled.label<{
  disabled: boolean;
}>`
  color: ${(props) =>
    props.disabled ? colors.gray['500'] : colors.blue['500']};
`;

export const RefreshSettings = styled.div`
  max-width: 240px;
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
  top: -10px;
  transform: translateX(-50%) translateY(-100%);
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
`;

export const CacheLimit = styled.div`
  display: flex;
  align-items: center;
`;
