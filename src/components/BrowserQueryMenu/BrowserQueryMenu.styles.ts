import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px 20px;
  border-top: solid 1px ${colors.gray[300]};
  border-bottom: solid 1px ${colors.gray[300]};
`;

export const ActionsContainer = styled.div<SpaceProps>`
  position: relative;
  ${space};
`;

export const BasicActions = styled.div`
  display: flex;
`;

export const ContextActions = styled.div`
  display: flex;
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 100%;
  transform: translateY(4px);
`;
