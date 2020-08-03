import styled from 'styled-components';

export const MenuItem = styled.div`
  width: 25%;
  max-width: 320px;
  flex-shrink: 0;
`;

export const Container = styled.div`
  display: flex;
  margin-bottom: 20px;

  ${MenuItem} + ${MenuItem} {
    margin-left: 20px;
  }
`;
