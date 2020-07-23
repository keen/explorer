import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 10px 14px;
  background: ${colors.white[500]};
  border-radius: 4px;
  border: solid 1px ${colors.white[500]};
  box-sizing: border-box;

  transition: border-color 0.2s linear;

  &:hover {
    border: 1px solid rgba(39, 86, 109, 0.5);
  }
`;
