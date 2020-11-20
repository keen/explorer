import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { BACKGROUND_MAIN } from '../../constants';

export const EditorActions = styled.div`
  display: flex;
  padding: 0 20px 20px 20px;
  background: ${BACKGROUND_MAIN};
`;

export const ButtonWrapper = styled.div`
  margin-left: 10px;
`;

export const CreatorContainer = styled.div`
  padding: 20px;
  background: ${BACKGROUND_MAIN};
`;

export const Card = styled.div`
  background: ${colors.white[500]};
  box-shadow: 0 2px 4px 0 ${transparentize(0.85, colors.black[500])};
`;
