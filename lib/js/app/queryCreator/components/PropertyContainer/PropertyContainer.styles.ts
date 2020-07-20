import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  padding: 10px;
  background: ${colors.gray[100]};
`;

export const Input = styled.input`
  outline: none;
  padding: 0;
  background: transparent;
  border: none;
`;
