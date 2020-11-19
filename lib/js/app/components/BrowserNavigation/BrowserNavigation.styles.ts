import styled from 'styled-components';
import { motion } from 'framer-motion';
import { parseToRgb, transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { convertRgbaToRgb } from '../../utils';
import { RgbaColor } from 'polished/lib/types/color';

export const Container = styled.div`
  display: flex;
  background: ${convertRgbaToRgb(
    parseToRgb(transparentize(0.9, colors.blue[100])) as RgbaColor
  )};
  padding: 10px 20px;
`;

export const Title = styled.div`
  color: ${colors.black[300]};
  font-size: 20px;
  font-family: 'Gangster Grotesk Bold', sans-serif;
  line-height: 24px;
`;

export const Actions = styled.div`
  margin-left: auto;
`;

export const Settings = styled.div`
  display: flex;
  align-items: center;
`;

export const Socket = styled.div`
  display: flex;
  margin-left: 20px;
`;

export const PulseMotion = styled(motion.div)`
  border-radius: 25px;
`;
