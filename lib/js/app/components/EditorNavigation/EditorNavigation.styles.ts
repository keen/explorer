import styled from 'styled-components';
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

export const MenuItem = styled.div``;

export const Menu = styled.div`
  display: flex;
  margin-left: auto;

  ${MenuItem} + ${MenuItem} {
    margin-left: 10px;
  }
`;

export const BackLink = styled(motion.div)`
  display: inline-flex;
  color: ${colors.blue[200]};

  margin-top: 10px;

  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;

  cursor: pointer;
`;

export const BackLinkText = styled.div`
  margin-left: 5px;
`;
