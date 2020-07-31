import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';
import { transparentize } from 'polished';

export const inputMixin = () => css`
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
  color: ${colors.blue[500]};

  &:focus {
    box-shadow: 0 0 3px 1px rgba(119, 163, 187, 0.5);
  }

  &:disabled {
    border: 1px solid ${transparentize(0.5, colors.blue[500])};
    background: ${colors.white[500]};
  }

  &:disabled::placeholder {
    color: ${transparentize(0.6, colors.black[400])};
  }
`;

export const Input = styled.input`
  ${inputMixin()}
`;
