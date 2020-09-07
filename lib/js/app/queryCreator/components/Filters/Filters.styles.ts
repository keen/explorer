import styled, { css } from 'styled-components';

export const Operator = styled.div`
  margin: 6px 0;
`;

export const FiltersSettings = styled.div`
  margin-bottom: 20px;
`;

export const ActionContainer = styled.div<{ hasSpacing: boolean }>`
  ${(props) =>
    props.hasSpacing &&
    css`
      margin-top: 5px;
    `};
`;
