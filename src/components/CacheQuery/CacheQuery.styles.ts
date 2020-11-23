import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`;

export const CacheSwitch = styled.label<{
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  margin-right: 4px;
  margin-bottom: 0;

  font-size: 14px;
  font-family: 'Lato Regular', sans-serif;
  line-height: 1;
  color: ${(props) =>
    props.disabled ? colors.gray['500'] : colors.black['500']};
`;

export const CacheLabel = styled.div<{
  disabled: boolean;
}>`
  margin: 0 0 0 7px;
  color: ${colors.black[100]};
  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;

  ${(props) =>
    props.disabled &&
    css`
      color: ${transparentize(0.5, colors.black[100])};
    `};
`;

export const LimitReached = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  position: relative;
  cursor: pointer;
`;

export const RefreshFrequency = styled.span`
  margin-right: 4px;
  color: ${colors.black[100]};
  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;
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
  font-size: 14px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.blue['500']};
`;

export const StyledLabel = styled.label`
  margin: 0;
`;
