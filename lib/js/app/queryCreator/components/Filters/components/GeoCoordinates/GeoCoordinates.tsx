import React, { FC } from 'react';

import {
  Container,
  InputContainer,
  Label,
  Input,
} from './GeoCoordinates.styles';
import text from './text.json';

import { Coordinates } from '../../types';

type Props = {
  /** Geo coordinates */
  value: Coordinates;
  /** Change event handler */
  onChange: (coordinates: Coordinates) => void;
};

const GeoCoordinates: FC<Props> = ({ value, onChange }) => {
  const { coordinates, maxDistanceMiles } = value;
  const [lat, long] = coordinates;

  return (
    <Container>
      <InputContainer>
        <Label>{text.latLabel}</Label>
        <Input
          type="number"
          data-testid="lat-input"
          value={lat}
          onChange={(e) => {
            const updatedLat = e.currentTarget.value
              ? parseInt(e.currentTarget.value)
              : undefined;
            onChange({ ...value, coordinates: [updatedLat, long] });
          }}
        />
      </InputContainer>
      <InputContainer>
        <Label>{text.longLabel}</Label>
        <Input
          type="number"
          data-testid="long-input"
          value={long}
          onChange={(e) => {
            const updatedLong = e.currentTarget.value
              ? parseInt(e.currentTarget.value)
              : undefined;
            onChange({ ...value, coordinates: [lat, updatedLong] });
          }}
        />
      </InputContainer>
      <InputContainer>
        <Label>{text.radiusLabel}</Label>
        <Input
          type="number"
          data-testid="radius-input"
          value={maxDistanceMiles}
          onChange={(e) => {
            const updatedRadius = e.currentTarget.value
              ? parseInt(e.currentTarget.value)
              : undefined;
            onChange({ ...value, maxDistanceMiles: updatedRadius });
          }}
        />
      </InputContainer>
    </Container>
  );
};

export default GeoCoordinates;
