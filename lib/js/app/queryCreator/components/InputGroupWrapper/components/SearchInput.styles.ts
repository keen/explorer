import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

type ContentProps = {
  isDragged: boolean;
};

type StyledInputProps = {
  inputWidth: number;
}

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
  width: ${props => props.inputWidth ? `${props.inputWidth}px` : 'auto'};

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

  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.blue['500']};

  cursor: ${props => props.isDragged ? 'grabbing' : 'text'};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 37px;
`;

export const TreeWrapper = styled.div`
  position: absolute;
  top: calc(100% + 3px);
  left: 0;
  right: 0;
  width: 285px;
  max-height: 300px;
  overflow-y: scroll;

  background-color: ${colors.white['500']};

  box-shadow: 0 0 3px 1px ${transparentize(0.85, colors.black['500'])};

  z-index:1;
`;
