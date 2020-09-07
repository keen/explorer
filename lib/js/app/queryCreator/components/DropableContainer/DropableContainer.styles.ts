import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { Variant } from './types';

const placeholderMixin = () => css`
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato', sans-serif;
  color: ${transparentize(0.5, colors.black[300])};
`;

const containerVariants = {
  prop: 'variant',
  variants: {
    primary: {
      background: colors.white[500],
      borderColor: colors.white[500],
      color: colors.blue['500'],
    },
    secondary: {
      background: transparentize(0.85, colors.blue[100]),
      borderColor: transparentize(0.85, colors.blue[100]),
      color: colors.blue['500'],
    },
  },
};

export const Container = styled.div<{
  variant: Variant;
  isActive?: boolean;
  hasError?: boolean;
}>`
  ${variant(containerVariants)}
  display: flex;
  padding: 10px 14px;
  height: 37px;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
  position: relative;

  ${(props) =>
    props.isActive &&
    css`
      box-shadow: 0 0 3px 1px rgba(29, 39, 41, 0.15);
    `}

  transition: box-shadow 0.2s;

  ${(props) =>
    props.hasError &&
    css`
      border: 1px solid ${transparentize(0.5, colors.red[500])};
    `}
`;

export const SearchIcon = styled.div`
  margin-right: 5px;
`;

export const DropIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: 5px;
  cursor: pointer;
`;

export const Placeholder = styled.div`
  ${placeholderMixin()};
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
