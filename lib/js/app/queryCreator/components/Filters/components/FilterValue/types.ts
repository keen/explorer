import { Coordinates, Operator, Property } from '../../../../types';

export type GetComponent = {
  propertyType: Property;
  operator: Operator;
  onChange: (
    value: string | boolean | number | Coordinates | Array<string | number>
  ) => void;
  value?: string | boolean | number | Coordinates | Array<string | number>;
  id: string;
};
