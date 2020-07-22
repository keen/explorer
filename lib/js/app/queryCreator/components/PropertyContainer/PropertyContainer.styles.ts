import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  padding: 10px;
  height: 40px;
  box-sizing: border-box;
  background: ${colors.gray[100]};
  position: relative;
`;

export const Input = styled.input`
  outline: none;
  padding: 0;
  background: transparent;
  border: none;
`;
