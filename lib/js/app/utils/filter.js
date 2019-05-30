import moment from 'moment';

export const getPropertyType = ({ schema, filter }) => {
  const {
    propertyName,
    operator,
  } = filter;

  let {
    propertyValue,
    propertyType,
  } = filter;

  const types = {
    'string':   'String',
    'num':      'Number',
    'datetime': 'Datetime',
    'list':     'List',
    'null':     'Null',
    'bool':     'Boolean',
  };

  if (propertyType) {
    return propertyType;
  }

  propertyType = types[schema[propertyName]];

  if (propertyType === 'Datetime') {
    const coercedDate = new Date(propertyValue);
    if (coercedDate !== null && coercedDate.toString() !== 'Invalid Date') {
      propertyValue = moment(propertyValue);
    }
  }

  return propertyType;

  if (!propertyValue) {
    propertyType = 'Null';
    propertyValue = 'Null';
  }
  if (operator === 'contains' || operator === 'not_contains') {
    propertyType = 'String';
  }
  if (operator === 'exists'
    && ['true', 'false'].includes(propertyValue.toString().toLowerCase())
  ) {
    propertyType = 'Boolean';
    propertyValue = propertyValue.toString().toLowerCase();
  }
  if (operator === 'in') {
    propertyType = 'List';
  }
  if (operator === 'within') {
    propertyType = 'List';
  }

console.log(typeof propertyValue, propertyValue);
  if (typeof propertyValue === 'string') {
    const coercedDate = new Date(propertyValue);
    if (coercedDate !== null && coercedDate.toString() !== 'Invalid Date') {
      propertyValue = moment(propertyValue);
      propertyType = 'Datetime';
    }
  }

  if (typeof propertyValue === 'number') {
    propertyType = 'Number';
  }

  console.log(propertyName, propertyType, operator, propertyValue);

  return propertyType;

};

export const getPropertyValue = ({  propertyType, filter }) => {
  const {
    propertyName,
    operator,
  } = filter;

  let {
    propertyValue,
  } = filter;

  if (propertyType === 'Datetime') {
    const coercedDate = new Date(propertyValue);
    if (coercedDate !== null && coercedDate.toString() !== 'Invalid Date') {
      propertyValue = moment(propertyValue);
    }
  }

  return propertyValue;
}