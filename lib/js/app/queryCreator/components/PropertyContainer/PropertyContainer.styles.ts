import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  padding: 10px 14px;
  height: 37px;
  box-sizing: border-box;
  background: ${colors.white[500]};
  color: ${colors.blue[500]};
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato', sans-serif;
  position: relative;
`;

export const Input = styled.input`
  outline: none;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.blue[500]};
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato', sans-serif;
`;
