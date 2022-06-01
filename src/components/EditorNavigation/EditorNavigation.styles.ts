import styled from 'styled-components';
import { position, PositionProps } from 'styled-system';
import { motion } from 'framer-motion';
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
  min-width: 0;
  flex: 1;
`;

export const WrapperHorizontal = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
`;

export const QueryMeta = styled.div`
  margin-left: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const QueryName = styled.div`
  max-width: 50%;
`;

export const MenuItem = styled.div<PositionProps>`
  ${position};
`;

export const Menu = styled.div`
  display: flex;
  margin-left: auto;
  column-gap: 10px;
  flex-shrink: 0;
`;

export const BackLink = styled(motion.div)`
  margin-top: 10px;
  display: inline-flex;
  cursor: pointer;
`;

export const BackLinkText = styled.div`
  margin-left: 5px;
`;

export const ButtonLabel = styled.span`
  white-space: nowrap;
`;
