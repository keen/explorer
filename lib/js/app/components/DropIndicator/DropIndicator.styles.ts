import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${transparentize(0.85, colors.blue[100])};
  width: 20px;
  height: 20px;
  border-radius: 2px;
  cursor: pointer;
`;
