import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
`;

export const Separator = styled.span`
  margin: 0 5px;
  color: ${transparentize(0.4, colors.blue[500])};
`;
