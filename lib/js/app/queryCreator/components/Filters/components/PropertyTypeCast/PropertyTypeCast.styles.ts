import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

export const DropableContainer = styled.div<{
  editMode: boolean;
  isActive: boolean;
}>`
  height: 37px;
  padding: 10px 14px;
  background: ${colors.white[500]};
  box-sizing: border-box;
  border: solid 1px ${colors.white[300]};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.black[100]};
  text-transform: lowercase;

  &:hover {
    background: ${colors.white[300]};
    color: ${transparentize(0.3, colors.black[100])};
  }

  ${(props) =>
    props.isActive &&
    css`
      color: ${colors.black[100]};
      background: ${colors.gray[200]};
    `}

  ${(props) =>
    props.editMode &&
    css`
      background: ${colors.white[300]};
      color: ${transparentize(0.3, colors.black[100])};
    `}

  transition: color, background .2s linear;
`;

export const WarningMessage = styled.div`
  padding: 10px;
  font-size: 12px;
  line-height: 15px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.black[100]};
  background: ${colors.white[300]};
`;

export const DropdownContainer = styled.div`
  width: 160px;
`;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const DefaultLabel = styled.span`
  color: ${transparentize(0.5, colors.black[500])};
`;
