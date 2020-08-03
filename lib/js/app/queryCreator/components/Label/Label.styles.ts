import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 10px 14px;
  background: ${transparentize(0.85, colors.blue[100])};
  border-radius: 4px;
  border: solid 1px ${transparentize(0.85, colors.blue[100])};
  box-sizing: border-box;
  height: 37px;

  transition: border-color 0.2s linear;

  &:hover {
    border: 1px solid rgba(39, 86, 109, 0.5);
  }
`;
