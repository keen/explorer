import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const AnalysisTitle = styled.span`
  text-transform: capitalize;
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const Groups = styled.div`
  padding: 10px 0;

  ${List} + ${List} {
    margin-top: 14px;
  }
`;
