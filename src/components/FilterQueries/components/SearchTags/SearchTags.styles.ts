import styled, { css } from 'styled-components';

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
    `};
`;

export const InputContainer = styled.div<{
  isActive: boolean;
}>`
  display: none;
  ${(props) =>
    props.isActive &&
    css`
      display: block;
    `};
`;

export const Container = styled.div`
  padding: 5px 14px;
`;

export const Label = styled.div`
  margin-right: 5px;
`;
