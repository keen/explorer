import styled from 'styled-components';

import { PropertyItem } from '../../../PropertyGroup';

export const Container = styled.div`
  position: relative;

  display: inline-flex;
  flex-direction: column;
`;

export const DropdownContent = styled.div`
  width: 285px;
  max-height: 300px;
  overflow-y: scroll;
`;

export const StyledPropertyItem = styled(PropertyItem)`
  background: none;
`;
