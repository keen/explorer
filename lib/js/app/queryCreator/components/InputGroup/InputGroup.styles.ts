import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

type ContainerProps = {
  isActive: boolean;
  isDragged: boolean;
};

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
  font-family: 'Lato', sans-serif;
  color: ${transparentize(0.5, colors.black[300])};
`;

export const Container = styled.div<ContainerProps>`
  position: relative;

  display: inline-flex;
  height: 37px;
  border-radius: 4px;

  cursor: ${props => props.isActive ? 'default' : props.isDragged ? 'grabbing' : 'grab'};
  ${props => props.isActive && css`box-shadow: 0 0 3px 1px ${transparentize(0.85, colors.black['500'])};`}
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  outline: none;
  box-shadow: none;
  background: none;

  height: 37px;
  padding: 10px 14px;

  font-family: 'Lato Regular', sans-serif;
  font-size: 25px;
  line-height: 30px;
  color: #C2777E;
`;

//${colors.red['200']}

export const StyledInput = styled.input<StyledInputProps>`
  outline: none;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.blue[500]};
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato', sans-serif;
  width: ${props => props.inputWidth && props?.inputWidth > INPUT_MIN_WIDTH ? `${props.inputWidth}px` : 'auto'};

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
`;

export const TreeWrapper = styled.div`
  position: absolute;
  top: calc(100% + 3px);
  left: 0;
  right: 0;

  background-color: ${colors.white['500']};

  z-index:1;
`;
