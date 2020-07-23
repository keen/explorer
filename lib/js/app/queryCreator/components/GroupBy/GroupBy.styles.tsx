import React, { forwardRef } from 'react';
import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
`;

export const Options = styled.div`
  margin-left: 20px;
`;

export const GroupSettings = styled.div``;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${GroupSettings} + ${GroupSettings} {
    margin-left: 10px;
  }
`;

export const GroupsContainer = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
  }
>(({ children }, ref) => {
  return <Container ref={ref}>{children}</Container>;
});
