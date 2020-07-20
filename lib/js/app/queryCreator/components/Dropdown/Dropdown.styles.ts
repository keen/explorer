import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled(motion.div)`
  position: absolute;
  background: ${colors.white[500]};
  border: solid 1px ${colors.gray[500]};
  z-index: 1;
`;
