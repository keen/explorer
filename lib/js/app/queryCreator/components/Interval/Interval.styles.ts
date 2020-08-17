import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  position: relative;
  width: 285px;
`;

export const IntervalContainer = styled.div`
  display: flex;

  div + button {
    margin-left: 10px;
  }
`;

export const DropdownContainer = styled.div`
  border-top: solid 1px ${colors.white[300]};
`;
