import styled from 'styled-components';

export const FilterItem = styled.div`
  margin-bottom: 4px;
`;

export const Container = styled.div`
  display: flex;

  ${FilterItem} + ${FilterItem} {
    margin-left: 5px;

    &:empty {
      display: none;
    }
  }
`;
