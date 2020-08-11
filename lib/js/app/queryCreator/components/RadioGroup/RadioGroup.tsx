import React, { FC, useCallback, useState } from 'react';
import {
  Container,
  StyledLabel,
  Radio,
  StyledInput,
  Marker,
} from './RadioGroup.styles';

type Group = {
  label: string;
  value: string;
};

type Props = {
  /** Group name */
  name: string;
  /** Group elements */
  elements: Group[];
  /** Active element value */
  value?: string;
  /** onChange handler */
  onChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};
const initialState = { x: 0, width: 0, height: 0, parentX: 0 };

const RadioGroup: FC<Props> = ({ name, elements, value, onChange }) => {
  const [state, setState] = useState(initialState);

  const activeRadioRef = useCallback((node) => {
    if (node !== null) {
      const { x, width, height } = node.getBoundingClientRect();
      setState((state) => ({
        ...state,
        x: x - state.parentX,
        width,
        height,
      }));
    }
  }, []);

  const containerRef = useCallback(
    (node) => {
      if (node !== null) {
        const { x } = node.getBoundingClientRect();
        setState((state) => ({
          ...state,
          parentX: x,
        }));
      }
    },
    [state.parentX]
  );

  const markerMotion = {
    initial: initialState,
    animate: state,
    exit: { opacity: 0 },
    transition: { delay: 0.1 },
  };

  return (
    <Container data-testid="radio-group" ref={containerRef}>
      {elements.map((radio) => (
        <Radio
          key={radio.value}
          ref={radio.value === value ? activeRadioRef : null}
        >
          <StyledInput
            type="radio"
            id={radio.value}
            value={radio.value}
            name={name}
            checked={radio.value === value}
            onChange={(e) => onChange(e, radio.value)}
          />
          <StyledLabel
            data-testid={`${radio.value}${
              radio.value === value ? '-active' : ''
            }`}
            htmlFor={radio.value}
          >
            {radio.label}
          </StyledLabel>
        </Radio>
      ))}
      {activeRadioRef && <Marker {...markerMotion} />}
    </Container>
  );
};

export default RadioGroup;
