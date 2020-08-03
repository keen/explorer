import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

type ContentProps = {
  isDragged: boolean;
};

type StyledInputProps = {
  inputWidth: number;
}

const INPUT_MIN_WIDTH = 120;

const placeholderMixin = () => css`
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
  color: ${transparentize(0.5, colors.black[300])};
`;

export const StyledInput = styled.input<StyledInputProps>`
  outline: none;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.blue[500]};
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato', sans-serif;
  width: ${props => props.inputWidth && props?.inputWidth > INPUT_MIN_WIDTH ? `${props.inputWidth}px` : `${INPUT_MIN_WIDTH}px`};

  ::placeholder,
  ::-webkit-input-placeholder {
    ${placeholderMixin()};
  }
  :-ms-input-placeholder {
    ${placeholderMixin()};
  }
`;

export const SearchIcon = styled.div`
  margin-right: 5px;
`;

export const Content = styled.div<ContentProps>`
  display: flex;

  padding: 10px 14px;
  min-width: ${INPUT_MIN_WIDTH}px;

  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.blue['500']};

  cursor: ${props => props.isDragged ? 'grabbing' : 'text'};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TreeWrapper = styled.div`
  position: absolute;
  top: calc(100% + 3px);
  left: 0;
  right: 0;

  background-color: ${colors.white['500']};

  z-index:1;
`;
