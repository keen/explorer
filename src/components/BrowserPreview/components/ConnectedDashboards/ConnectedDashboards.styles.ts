import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  overflow: auto;
`;

export const LinkWrapper = styled.div`
  cursor: pointer;
  margin-top: 5px;
`;

export const Item = styled.div`
  display: inline-flex;
`;
