import styled, { css } from 'styled-components';

export const MenuItem = styled.div<{
  width?: string;
}>`
  width: ${props => props.width};
  max-width: 320px;
  flex-shrink: 0;
  ${props => props.width && css`
    width: ${props.width};
  `}
`;

export const Container = styled.div`
  display: flex;
  margin-bottom: 20px;

  ${MenuItem} + ${MenuItem} {
    margin-left: 20px;
  }
`;
