import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.div`
  margin-top: 10px;
  font-family: Lato Regular, sans-serif;
  font-size: 14px;
  color: ${colors.blue[500]};
  line-height: 30px;
`;
