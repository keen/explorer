import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const CacheLabel = styled.label<{
  disabled: boolean;
}>`
  color: ${(props) =>
    props.disabled ? colors.gray['500'] : colors.blue['500']};
`;

export const RefreshSettings = styled.div`
  max-width: 240px;
`;
