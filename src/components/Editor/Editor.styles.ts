import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { BACKGROUND_MAIN } from '../../constants';

export const NavBar = styled.div`
  margin-top: 15px;
  border-bottom: solid 1px ${colors.gray[500]};
`;

export const EditorActions = styled.div`
  display: flex;
  padding: 0 20px 20px 20px;
  background: ${BACKGROUND_MAIN};
`;

export const SectionContainer = styled.div`
  padding-bottom: 20px;
  background: ${BACKGROUND_MAIN};
`;

export const ActionButton = styled.div`
  margin-left: 10px;
`;

export const CustomizationContainer = styled.div`
  padding: 15px 0;

  background: ${colors.white[500]};
  border-bottom: solid 1px ${colors.gray[500]};
`;

export const QueryContainer = styled.div`
  padding: 20px;
  background: ${BACKGROUND_MAIN};
`;

export const Card = styled.div`
  background: ${colors.white[500]};
  box-shadow: 0 2px 4px 0 ${transparentize(0.85, colors.black[500])};
`;
