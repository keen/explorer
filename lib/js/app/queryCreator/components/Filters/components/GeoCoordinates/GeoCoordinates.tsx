import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Container,
  GeoItem,
  Radius,
  InputContainer,
  Label,
  Input,
} from './GeoCoordinates.styles';

import { Coordinates } from '../../../../types';

type Props = {
  /** Geo coordinates */
  value: Coordinates;
  /** Change event handler */
  onChange: (coordinates: Coordinates) => void;
};

const GeoCoordinates: FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const { coordinates, maxDistanceMiles } = value;
  const [lat, long] = coordinates;

  return (
    <Container>
      <GeoItem>
        <InputContainer>
          <Label>{t('query_creator_geo_coordinates.lat_label')}</Label>
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
      </GeoItem>
      <GeoItem>
        <InputContainer>
          <Label>{t('query_creator_geo_coordinates.long_label')}</Label>
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
      </GeoItem>
      <GeoItem>
        <Radius>
          <InputContainer>
            <Label>{t('query_creator_geo_coordinates.radius_label')}</Label>
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
            <Label>{t('query_creator_geo_coordinates.radius_unit')}</Label>
          </InputContainer>
        </Radius>
      </GeoItem>
    </Container>
  );
};

export default GeoCoordinates;
