import styled from 'styled-components';
import { parseToRgb, transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { RgbaColor } from 'polished/lib/types/color';
import { convertRgbaToRgb } from '../../utils';

export const EditorActions = styled.div`
  display: flex;
  padding: 0 20px 20px 20px;
  background: ${convertRgbaToRgb(
    parseToRgb(transparentize(0.9, colors.blue[100])) as RgbaColor
  )};
`;

export const ButtonWrapper = styled.div`
  margin-left: 10px;
`;

export const CreatorContainer = styled.div`
  padding: 20px;
  background: ${convertRgbaToRgb(
    parseToRgb(transparentize(0.9, colors.blue[100])) as RgbaColor
  )};
`;

export const Card = styled.div`
  background: ${colors.white[500]};
  box-shadow: 0 2px 4px 0 ${transparentize(0.85, colors.black[500])};
`;
