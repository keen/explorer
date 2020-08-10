import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 10px 14px;
  height: 37px;
  box-sizing: border-box;
`;

const placeholderMixin = () => css`
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato', sans-serif;
  color: ${transparentize(0.5, colors.black[300])};
`;

export const Content = styled.div`
  display: flex;
  cursor: default;
`;

export const Placeholder = styled.span`
  ${placeholderMixin()};
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

export const Input = styled.input`
  outline: none;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.blue[500]};
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
  width: 100%;

  ::placeholder,
  ::-webkit-input-placeholder {
    ${placeholderMixin()};
  }
  :-ms-input-placeholder {
    ${placeholderMixin()};
  }
`;
