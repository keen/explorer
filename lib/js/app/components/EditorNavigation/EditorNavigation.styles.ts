import styled from 'styled-components';
import { position, PositionProps } from 'styled-system';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${transparentize(0.9, colors.blue[100])};
  padding: 10px 20px;
`;

export const WrapperVertical = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const WrapperHorizontal = styled.div`
  display: flex;
  align-items: center;
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

export const MenuItem = styled.div<PositionProps>`
  ${position}
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
  right: 0;
  top: 100%;
  transform: translateY(4px);
`;

export const TooltipContent = styled.div`
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;
  white-space: nowrap;

  color: ${colors.black[500]};
`;

export const BackLink = styled(motion.div)`
  margin-top: 10px;

  display: inline-flex;

  color: ${colors.blue[200]};
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;

  cursor: pointer;
`;

export const BackLinkText = styled.div`
  margin-left: 5px;
`;
