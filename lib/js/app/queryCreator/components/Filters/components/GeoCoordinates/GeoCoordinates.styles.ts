import styled from 'styled-components';
import { colors } from '@keen.io/colors';
import { transparentize } from 'polished';

export const InputContainer = styled.div`
  display: flex;
  padding: 10px 14px;
  height: 37px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${transparentize(0.5, colors.black[500])};
  border-radius: 4px;
  outline: none;

  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
`;

export const Container = styled.div`
  display: flex;

  ${InputContainer} + ${InputContainer} {
    margin-left: 5px;
  }
`;

export const Label = styled.div`
  margin-right: 5px;
`;

export const Input = styled.input`
  outline: none;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.blue[500]};
  width: 100%;
`;
