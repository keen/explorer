import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

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

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 11px;
  width: 37px;
  height: 37px;
  border-radius: 4px;
  
  text-decoration: none;
  font-family: 'Lato Regular', sans-serif;
  font-size: 25px;
  line-height: 30px;
  
  background-color: ${transparentize(0.85, colors.blue['100'])};
  color: ${colors.green['500']};
  
  outline: none;
  border: none;
  cursor: pointer;
  
  transition: background-color 0.15s ease-in-out;
  
  &:hover {
    text-decoration: none;
    background-color: ${transparentize(0.75, colors.blue['100'])};
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
