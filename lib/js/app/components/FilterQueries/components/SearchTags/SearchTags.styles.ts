import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

export const PlaceholderContainer = styled.div<{
  isActive: boolean;
}>`
  height: 37px;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    props.isActive &&
    css`
      display: none;
    `}
`;

export const InputContainer = styled.div<{
  isActive: boolean;
}>`
  display: none;
  ${(props) =>
    props.isActive &&
    css`
      display: block;
    `}
`;

export const Container = styled.div`
  padding: 5px 14px;
`;

export const Label = styled.span`
  margin-right: 5px;
  color: ${colors.black[100]};
  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;
`;
