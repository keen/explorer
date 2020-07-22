import styled from 'styled-components';

export const MenuItem = styled.div`
  width: 25%;
`;

export const PropertiesMenu = styled.div`
  display: flex;

  ${MenuItem} + ${MenuItem} {
    margin-left: 20px;
  }
`;
