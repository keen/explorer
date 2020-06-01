import styled from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  height: 40px;
`;

export const CacheSwitch = styled.label<{
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-bottom: 0;

  font-size: 14px;
  font-family: 'Lato Regular', sans-serif;
  color: ${(props) =>
    props.disabled ? colors.gray['500'] : colors.black['500']};
`;

export const CheckboxLabel = styled.div`
  margin-left: 7px;
`;

export const SelectContainer = styled.div`
  width: 80px;
  margin: 0 10px;
`;

export const RefreshSettings = styled.div`
  display: flex;
  align-items: center;

  font-size: 14px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.black['500']};
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
  font-size: 14px;
  font-family: 'Lato Regular', sans-serif;
  color: ${transparentize(0.5, colors.black['500'])};
`;
