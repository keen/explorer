import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { StepContainer } from '../FunnelStep/FunnelStep.styles';

export const AddStep = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: ${transparentize(0.9, colors.green[300])};
  border: 1px dashed ${colors.green[300]};
  font-family: Lato Bold, sans-serif;
  font-size: 16px;
  color: ${colors.green[500]};
  text-align: left;
  cursor: pointer;

  transition: background 0.2s linear;

  &:hover {
    background: ${transparentize(0.6, colors.green[300])};
  }
`;

export const IconWrapper = styled.div`
  margin-right: 6px;
`;

export const Container = styled.div`
  ${StepContainer} + ${StepContainer} {
    margin-top: 10px;
  }

  ${StepContainer} + ${AddStep} {
    margin-top: 10px;
  }
`;
