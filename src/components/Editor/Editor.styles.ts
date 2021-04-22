import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { BACKGROUND_MAIN } from '../../constants';

export const NavBar = styled.div`
  margin-top: 15px;
  border-bottom: solid 1px ${colors.gray[300]};
`;

export const EditorActions = styled.div`
  display: flex;
  padding: 10px 20px 20px 20px;
`;

export const SectionContainer = styled.div`
  box-shadow: 0 2px 4px 0 ${transparentize(0.85, colors.black[500])};
`;

export const ActionButton = styled.div`
  margin-left: 10px;
`;

export const CustomizationContainer = styled.div`
  padding: 15px 0;
  background: ${colors.white[500]};
`;

export const Card = styled.div`
  background: ${colors.white[500]};
  box-shadow: 0 2px 4px 0 ${transparentize(0.85, colors.black[500])};
`;

export const Container = styled.div`
  background: ${BACKGROUND_MAIN};
`;
