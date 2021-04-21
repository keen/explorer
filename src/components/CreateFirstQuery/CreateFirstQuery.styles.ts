import styled from 'styled-components';
import { space, layout, SpaceProps, LayoutProps } from 'styled-system';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const MotionContainer = styled(motion.div)<SpaceProps & LayoutProps>`
  position: absolute;
  padding: 20px 80px;
  box-sizing: border-box;
  ${space};
  ${layout};

  background: ${colors.white[500]};
  color: ${colors.green[500]};
  font-family: 'Gangster Grotesk Regular', sans-serif;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  box-shadow: 0 10px 24px 0 rgba(29, 39, 41, 0.15);
  cursor: pointer;
`;
