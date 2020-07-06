import { SchemaProp } from '../types';

export const convertSchemaProp = (prop: SchemaProp) => {
  const schemaProps = {
    num: 'Number',
    string: 'String',
    bool: 'Boolean',
    datetime: 'Datetime',
    null: 'String',
    list: 'List',
    geo: 'List',
    array: 'List',
  };
  return schemaProps[prop];
};