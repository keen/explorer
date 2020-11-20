import styled from 'styled-components';
import { position, PositionProps } from 'styled-system';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';
import { UI_LAYERS } from '@keen.io/ui-core';
import { BACKGROUND_MAIN } from '../../constants';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${BACKGROUND_MAIN};
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
  z-index: ${UI_LAYERS.tooltip};
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
