import styled from 'styled-components';

import { PropertyItem } from '../../../PropertyGroup';

type Props = {
  isActive: boolean;
};

export const Container = styled.div<Props>`
  position: relative;

  display: inline-flex;
  flex-direction: column;

  cursor: ${(props) => (props.isActive ? 'default' : 'grab')};
`;

export const DropdownContent = styled.div`
  width: 285px;
  max-height: 300px;
  overflow-y: scroll;
`;

export const StyledPropertyItem = styled(PropertyItem)`
  background: none;
`;
