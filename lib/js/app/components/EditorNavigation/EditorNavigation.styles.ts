import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f1f5f8;
  padding: 10px 20px;
`;

export const MenuItem = styled.div``;

export const Menu = styled.div`
  display: flex;

  ${MenuItem} + ${MenuItem} {
    margin-left: 15px;
  }
`;
