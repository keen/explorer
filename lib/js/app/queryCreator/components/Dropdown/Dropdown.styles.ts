import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled(motion.div)`
  position: absolute;
  width: 100%;
  background: ${colors.white[500]};
  border: solid 1px ${colors.gray[200]};
  box-shadow: 0 10px 24px 0 rgba(29,39,41,0.15);
  z-index: 1;
`;
