import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const TimeRow = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${TimeRow} + ${TimeRow} {
    margin-top: 10px;
  }
`;

export const TimeLabel = styled.div`
  font-size: 14px;
  line-height: 17px;
  font-family: Lato Regular, sans-serif;
  color: ${colors.blue[500]};
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-right: 10px;
  width: 35px;
`;
