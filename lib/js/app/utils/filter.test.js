import { convertFilterValuesToJsonValues } from './filter';

describe('convertFilterValuesToJsonValues()', () => {
  test('params without filters return params', () => {
    const params = {"actorProperty":"geo_information.country","eventCollection":"purchases","filters":[],"inverted":false,"optional":false,"timeframe":"this_10_years","timezone":null,"withActors":false};
    expect(convertFilterValuesToJsonValues(params)).toEqual(params);
  });

  test('params without propertyType return nothing', () => {
    const params = {"actorProperty":"geo_information.country","eventCollection":"logins","filters":[{"propertyName":"geo_information.country_code","operator":"eq","propertyValue":"pl"}],"inverted":false,"optional":false,"timeframe":"this_10_years","timezone":null,"withActors":false};
    expect(convertFilterValuesToJsonValues(params)).toBeUndefined;
  });

  test('params with "String" as propertyType return params', () => {
    const params = {"actorProperty":"geo_information.country","eventCollection":"logins","filters":[{"propertyName":"geo_information.country_code","propertyType":"String","operator":"eq","propertyValue":"pl"}],"inverted":false,"optional":false,"timeframe":"this_10_years","timezone":null,"withActors":false};
    expect(convertFilterValuesToJsonValues(params)).toEqual(params);
  });

  test('params with "contains" operator return params', () => {
    const params = {"actorProperty":"geo_information.country","eventCollection":"logins","filters":[{"propertyName":"geo_information.country","propertyType":"String","operator":"contains","propertyValue":"PL"}],"inverted":false,"optional":false,"timeframe":"this_10_years","timezone":null,"withActors":false};
    expect(convertFilterValuesToJsonValues(params)).toEqual(params);
  });

  test('params with "Datetime" as propertyType return params', () => {
    const params = {"actorProperty":"geo_information.country","eventCollection":"logins","filters":[{"propertyName":"keen.created_at","propertyType":"Datetime","operator":"gt","propertyValue":"2020-06-01T12:00:00.000Z"}],"inverted":false,"optional":false,"timeframe":"this_10_years","timezone":null,"withActors":false};
    expect(convertFilterValuesToJsonValues(params)).toEqual(params);
  });

  test('params with "Boolean" as propertyType return boolean', () => {
    const params = {"actorProperty":"geo_information.country","eventCollection":"logins","filters":[{"propertyName":"geo_information.country","operator":"exists","propertyType":"Boolean","propertyValue":"true"}],"inverted":false,"optional":false,"timeframe":"this_10_years","timezone":null,"withActors":false};
    const result = convertFilterValuesToJsonValues(params);
    result.filters.forEach(filter => expect(typeof filter.propertyValue).toBe('boolean'));  
  });

  test('params with "String" as propertyType and "in" as operator return array', () => {
    const propertyValue = "linux, windows";
    const params = {"actorProperty":"geo_information.country","eventCollection":"logins","filters":[{"propertyName":"platform","operator":"in","propertyType":"String","propertyValue":propertyValue}],"inverted":false,"optional":false,"timeframe":"this_10_years","timezone":null,"withActors":false};
    const result = convertFilterValuesToJsonValues(params);
    result.filters.forEach(filter => {
      expect(Array.isArray(filter.propertyValue)).toBeTruthy();
      expect(filter.propertyValue.length).toEqual(2);
      expect(filter.propertyValue.includes('linux')).toBeTruthy();
    }); 
  });

  test('params with "Number" as propertyType and "in" as operator return array', () => {
    const propertyValue = "100,200,300";
    const params = {"actorProperty":"geo_information.country","eventCollection":"logins","filters":[{"propertyName":"user.id","operator":"in","propertyType":"Number","propertyValue":propertyValue}],"inverted":false,"optional":false,"timeframe":"this_10_years","timezone":null,"withActors":false};
    const result = convertFilterValuesToJsonValues(params);
    result.filters.forEach(filter => {
      expect(Array.isArray(filter.propertyValue)).toBeTruthy();
      expect(filter.propertyValue.length).toEqual(3);
      expect(filter.propertyValue.includes('100')).toBeTruthy();
    });
  });

  test('params with "Number" as propertyType and "eq" as operator return number', () => {
    const params = {"actorProperty":"geo_information.country","eventCollection":"logins","filters":[{"propertyName":"user.id","operator":"eq","propertyType":"Number","propertyValue":"100"}],"inverted":false,"optional":false,"timeframe":"this_10_years","timezone":null,"withActors":false};
    const result = convertFilterValuesToJsonValues(params);
    result.filters.forEach(filter => expect(typeof filter.propertyValue).toBe('number'));  
  });

  test('params with "List" as propertyValue and "eq" as operator return params', () => {
    const params = {"actorProperty":"geo_information.country","eventCollection":"logins","filters":[{"propertyName":"platform","operator":"ne","propertyType":"List","propertyValue":"windows, linux"}],"inverted":false,"optional":false,"timeframe":"this_10_years","timezone":null,"withActors":false};
    expect(convertFilterValuesToJsonValues(params)).toEqual(params);
  });

  test('params with "List" as propertyValue and "within" as operator return formatted coordinates', () => {
    const params = {"actorProperty":"geo_information.country","eventCollection":"logins","filters":[{"propertyName":"geo_information.coordinates","operator":"within","propertyType":"List","propertyValue":{"coordinates":["10","10"],"maxDistanceMiles":"10"}}],"inverted":false,"optional":false,"timeframe":"this_10_years","timezone":null,"withActors":false};
    const result = convertFilterValuesToJsonValues(params);
    result.filters.forEach(filter => {
      expect(typeof filter.propertyValue).toEqual('object');
      expect(typeof filter.propertyValue.coordinates[0]).toEqual('number');
      expect(typeof filter.propertyValue.coordinates[1]).toEqual('number');
      expect(typeof filter.propertyValue.maxDistanceMiles).toEqual('number');
    });
  });

});

