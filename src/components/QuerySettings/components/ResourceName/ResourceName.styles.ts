import styled, { css } from 'styled-components';

export const IconWrapper = styled.span`
  display: inline-block;
  margin-top: 1px;
  margin-left: 4px;
`;

export const Container = styled.div<{ isDisabled: boolean }>`
  cursor: pointer;

  ${(props) =>
    props.isDisabled &&
    css`
      cursor: not-allowed;
    `};
`;

export const Hint = styled.span`
  display: block;
  margin-top: 15px;
`;
