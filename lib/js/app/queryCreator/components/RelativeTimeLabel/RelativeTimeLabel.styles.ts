import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const IncludesToday = styled.span`
  margin-left: 4px;
  color: ${transparentize(0.4, colors.blue[500])};
`;
