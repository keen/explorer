import styled from 'styled-components';
import { colors } from '@keen.io/colors';
import { transparentize } from 'polished';

export const Label = styled.div`
  color: ${transparentize(0.5, colors.blue[500])};
`;

export const Input = styled.input`
  outline: none;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.blue[500]};
  width: 100%;

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

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

  ${Label} + ${Input} {
    margin-left: 5px;
  }
`;

export const GeoItem = styled.div``;

export const Radius = styled.div`
  max-width: 120px;
`;

export const Container = styled.div`
  display: flex;

  ${GeoItem} + ${GeoItem} {
    margin-left: 5px;
  }
`;
