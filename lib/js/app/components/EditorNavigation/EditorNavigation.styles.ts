import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${transparentize(0.9, colors.blue[100])};
  padding: 10px 20px;
`;

export const QueryMeta = styled.div`
  display: flex;
  margin-left: 10px;
`;

export const Tag = styled.div`
  margin-right: 10px;
`;

export const QueryName = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-family: 'Gangster Grotesk Bold', sans-serif;
  color: ${colors.blue[500]};
`;

type MenuItemProps = {
  position?: 'static' | 'relative';
};
export const MenuItem = styled.div<MenuItemProps>`
  ${(props) =>
    props.position &&
    css`
      position: ${props.position};
    `}
`;

export const Menu = styled.div`
  display: flex;
  margin-left: auto;

  ${MenuItem} + ${MenuItem} {
    margin-left: 10px;
  }
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateY(4px);
`;

export const TooltipContent = styled.div`
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;

  color: ${colors.black[500]};
`;
