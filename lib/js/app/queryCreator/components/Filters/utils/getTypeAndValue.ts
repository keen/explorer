import { Filter } from '../../../types';

import { getPropertyType } from './getPropertyType';

export const getTypeAndValue = ({ filter, eventCollection, schemas }: { filter: Filter, eventCollection: string, schemas: any}) => {
  const {
    propertyName,
    operator,
    propertyValue,
  } = filter;

  const schemasFromProps =
    (schemas && Object.keys(schemas).length && schemas) || {};
  const schema = schemasFromProps && schemasFromProps[eventCollection];

  const propertyType = getPropertyType({
    schema,
    filter: {
      propertyName,
      operator,
      propertyValue,
    },
  });

  return {
    propertyValue,
    propertyType,
  };
};