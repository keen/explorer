import styled from 'styled-components';
import { colors } from '@keen.io/colors';

const Label = styled.label<{
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  margin-right: 5px;

  font-size: 14px;
  font-family: 'Lato Regular', sans-serif;
  color: ${(props) =>
    props.disabled ? colors.gray['500'] : colors.black['500']};
`;

export default Label;
