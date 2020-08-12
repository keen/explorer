import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 16px;
  font-family: 'Lato Bold', sans-serif;
  color: ${colors.black['500']};
  margin-bottom: 20px;
`;

export const Settings = styled.div`
  padding: 15px 20px;
  border-top: solid 1px ${colors.gray['500']};
  border-bottom: solid 1px ${colors.gray['500']};
`;

export const QueryName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ResourceName = styled.div`
  cursor: pointer;
  margin-bottom: 20px;
`;

export const ResourceMessage = styled.span`
  color: ${transparentize(0.5, colors.black['500'])};
`;

export const InputContainer = styled.div`
  margin: 0 10px;
  width: 400px;
`;

export const Actions = styled.div`
  display: flex;
  margin-top: 15px;

  button + button {
    margin-left: 10px;
  }
`;
