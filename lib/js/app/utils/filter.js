import moment from 'moment';
import parse from 'csv-parse/lib/es5/sync';

export const convertDateToString = (valueSelected) => {
  const value = valueSelected || moment(moment().format('YYYY-MM-DD'));
  const valueConverted = `${value.format('YYYY-MM-DD')}T${value.format(
    'HH:mm'
  )}:00.000Z`;
  return valueConverted;
};

export const translateDeprecatedCharts = (chartType) => {
  const map = {
    areachart: 'area',
    barchart: 'horizontal-bar',
    columnchart: 'bar',
    linechart: 'line',
    piechart: 'pie',
  };
  return map[chartType] || chartType || 'JSON';
};

const types = {
  string: 'String',
  num: 'Number',
  datetime: 'Datetime',
  list: 'List',
  null: 'Null',
  bool: 'Boolean',
};

export const getPropertyType = ({ schema, filter }) => {
  const { propertyName, operator } = filter;

  let { propertyType } = filter;

  if (propertyType) {
    return propertyType;
  }

  const typeFromSchema = (schema && schema[propertyName]) || {};
  propertyType = types[typeFromSchema];

  if (operator === 'exists') {
    propertyType = 'Boolean';
  }

  return propertyType;
};

export const getTypeAndValue = ({ filter, eventCollection, schemas }) => {
  const {
    property_name: propertyName,
    operator,
    property_value: propertyValue,
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

export const getPropertyValue = ({ propertyType, filter }) => {
  let { propertyValue } = filter;

  if (propertyType === 'Datetime') {
    const coercedDate = new Date(propertyValue);
    if (coercedDate !== null && coercedDate.toString() !== 'Invalid Date') {
      propertyValue = moment(propertyValue);
    }
  }

  if (typeof propertyValue !== 'undefined') {
    if (['true', 'false'].includes(propertyValue.toString().toLowerCase())) {
      propertyValue = propertyValue.toString().toLowerCase();
    }
  }

  return propertyValue;
};

export const convertFilterValuesToJsonValues = (params) => {
  if (params.filters) {
    const filters = params.filters.map(
      ({ propertyName, propertyType, operator, propertyValue }) => {
        let value;

        if (!propertyType) {
          console.log('no prop type in filter', params);

          propertyType = types.string;

          if (
            typeof propertyValue === 'string' &&
            new Date(propertyValue) &&
            new Date(propertyValue).toString() !== 'Invalid Date'
          ) {
            propertyType = types.datetime;
          }

          if (typeof propertyValue === 'number') {
            propertyType = types.num;
          }

          if (typeof propertyValue === 'boolean') {
            propertyType = types.bool;
          }

          if (propertyValue !== null && typeof propertyValue === 'object') {
            // array or object
            propertyType = types.list;
          }

          if (propertyValue === null) {
            propertyType = types.null;
          }
        }

        if (
          propertyType === 'String' ||
          propertyType === 'Datetime' ||
          operator === 'contains' ||
          operator === 'not_contains'
        ) {
          value = propertyValue;
        }

        if (propertyType === 'Boolean' || operator === 'exists') {
          value = propertyValue;
        } else if (operator === 'in' && typeof propertyValue === 'string') {
          value = parse(propertyValue, {
            quote: '"',
            ltrim: true,
            rtrim: true,
            delimiter: ',',
          })[0];

          if (propertyType === 'Number') {
            value = value.map((val) => val.replace(/['"]+/g, '')); // backwards compatible '1', '2'...
          }
        } else if (propertyType === 'Number') {
          value = parseFloat(propertyValue);
        } else if (propertyType === 'List') {
          value = propertyValue;
          if (operator === 'within') {
            const long = parseFloat(propertyValue.coordinates[0] || 0);
            const lat = parseFloat(propertyValue.coordinates[1] || 0);
            const radius = parseFloat(propertyValue.maxDistanceMiles || 0);
            value = {
              coordinates: [long, lat],
              maxDistanceMiles: radius,
            };
          }
        }

        if (operator === 'Null') {
          // there is no 'null' operator but propertyType
          value = null;
        }

        return {
          propertyName,
          propertyType,
          operator,
          propertyValue: value,
        };
      }
    );

    return {
      ...params,
      filters: [...filters],
    };
  }

  return { ...params };
};
