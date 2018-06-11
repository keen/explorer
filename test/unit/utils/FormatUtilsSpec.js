import _ from 'lodash';
import moment from 'moment';
import TestHelpers from '../../support/TestHelpers';
import FormatUtils from '../../../lib/js/app/utils/FormatUtils';

describe('utils/FormatUtils', () => {
  describe('toTitleCase', () => {
    it('transforms text to titleCase', () => {
      expect(FormatUtils.toTitleCase('keenIO')).toEqual('Keenio');
    });
  });

  describe('singularize', () => {
    it('transforms text to singular', () => {
      expect(FormatUtils.singularize('analytics')).toEqual('analytic');
    });
  });

  describe('prettyPrintJSON', () => {
    it('stringifies the json', () => {
      const json = 'json';
      const stringifySpy = jest.spyOn(JSON, 'stringify');
      FormatUtils.prettyPrintJSON(json);
      expect(stringifySpy).toHaveBeenCalledWith(json, undefined, 2);
    });
  });

  describe('sortItems', () => {
    it('sorts things', () => {
      const sortedItems = FormatUtils.sortItems(['b', 'a']);
      expect(sortedItems).toEqual(['a', 'b']);
    });
    // x'd because phantomJs < 2.0.0 localeCompare fails; 2.0.0 is released but
    // is not yet listed on npm.
    xit('sorts unicode properly', () => {
      const sortedItems = FormatUtils.sortItems(['a', 'n', 'b', 'z', 'ñ']);
      expect(sortedItems).toEqual(['a', 'b', 'n', 'ñ', 'z']);
    });
    it('ignores dash, underscore, case, and period', () => {
      const sortedItems = FormatUtils.sortItems(['-ad', 'a_e', 'A.f', 'a-c', 'Ab']);
      expect(sortedItems).toEqual(['Ab', 'a-c', '-ad', 'a_e', 'A.f']);
    });
  })

  describe('coercionTypeForPropertyType', () => {
    it("returns 'String' for string", () => {
      const propertyType = 'string';
      expect(FormatUtils.coercionTypeForPropertyType(propertyType)).toEqual('String');
    });
    it("returns 'Number' for num", () => {
      const propertyType = 'num';
      expect(FormatUtils.coercionTypeForPropertyType(propertyType)).toEqual('Number');
    });
    it("returns 'Datetime' for datetime", () => {
      const propertyType = 'datetime';
      expect(FormatUtils.coercionTypeForPropertyType(propertyType)).toEqual('Datetime');
    });
    it("returns 'List' for list", () => {
      const propertyType = 'list';
      expect(FormatUtils.coercionTypeForPropertyType(propertyType)).toEqual('List');
    });
    it("returns 'Null' for null", () => {
      const propertyType = 'null';
      expect(FormatUtils.coercionTypeForPropertyType(propertyType)).toEqual('Null');
    });
    it("returns 'Boolean' for boolean", () => {
      const propertyType = 'bool';
      expect(FormatUtils.coercionTypeForPropertyType(propertyType)).toEqual('Boolean');
    });
  });

  describe('formatISOTimeNoTimezone', () => {
    it('formats as ISO time without a timezone', () => {
      const time = moment('2014-08-20 15:44').format();
      expect(FormatUtils.formatISOTimeNoTimezone(time).match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}/)).not.toBe(null);
    });
  });

  describe('booleanMap', () => {
    it('maps correctly for strings', () => {
      expect(FormatUtils.booleanMap('true')).toEqual('true');
      expect(FormatUtils.booleanMap('false')).toEqual('false');
    });

    it('maps correctly for null', () => {
      expect(FormatUtils.booleanMap(null)).toEqual('');
    });

    it('maps correctly for booleans', () => {
      expect(FormatUtils.booleanMap(true)).toEqual('true');
      expect(FormatUtils.booleanMap(false)).toEqual('false');
    });

    it('maps correctly for truthy values', () => {
      expect(FormatUtils.booleanMap(1)).toEqual('true');
      expect(FormatUtils.booleanMap('abc')).toEqual('true');
    });
  });

  describe('isValidQueryValue', () => {
    it('should return true for arrays with one or more values', () => {
      expect(FormatUtils.isValidQueryValue(['one'])).toBe(true);
    });

    it('should return false for empty arrays', () => {
      expect(FormatUtils.isValidQueryValue([])).toBe(false);
    });

    it('should return false for null values', () => {
      expect(FormatUtils.isValidQueryValue(null)).toBe(false);
    });

    it('should return false for undefined values', () => {
      expect(FormatUtils.isValidQueryValue(undefined)).toBe(false);
    });

    it('should return true for false', () => {
      expect(FormatUtils.isValidQueryValue(false)).toBe(true);
    });

    it('should return true for numeric 0', () => {
      expect(FormatUtils.isValidQueryValue(0)).toBe(true);
    });
  });

  describe('parseList', () => {
    describe('Strings', () => {
      it('splits a string on commas', () => {
        const input = '"apple", "orange"';
        const parsedList = FormatUtils.parseList(input);
        expect(parsedList).toEqual(['apple', 'orange']);
      });
      it('respects internal commas and whitespace in a double quoted string', () => {
        const input = '"apple, banana", "orange"';
        const parsedList = FormatUtils.parseList(input);
        expect(parsedList).toEqual(['apple, banana', 'orange']);
      });
      it('respects numbers wrapped in double quotes as strings', () => {
        const input = '"1", "1.25"';
        const parsedList = FormatUtils.parseList(input);
        expect(parsedList).toEqual(['1', '1.25']);
      });
      it('respects quoted strings', () => {
        const input = '"\'to be or not to be\'", "that is the question"';
        const parsedList = FormatUtils.parseList(input);
        expect(parsedList).toEqual(['\'to be or not to be\'', 'that is the question']);
      });
    });
    describe('Numbers', () => {
      it('treats numbers wrapped in single quotes as numbers', () => {
        const input = '\'1\', \'1.25\'';
        const parsedList = FormatUtils.parseList(input);
        expect(parsedList).toEqual([
          1, 1.25]);
      });
    });
    describe('Mixed', () => {
      it('allows for mixed types', () => {
        const input = '"a, banana", \'1\', "1.25"';
        const parsedList = FormatUtils.parseList(input);
        expect(parsedList).toEqual(['a, banana', 1, '1.25']);
      });
    });
    describe('Incorrect', () => {
      it('returns empty string for values that are not lists', () => {
        const input = 'some name';
        const parsedList = FormatUtils.parseList(input);
        expect(parsedList).toEqual('');
      });
    });
  });

  describe('isList', () => {
    it('returns true for a string in expected list format', () => {
      expect(FormatUtils.isList("\"a thing\", '1', '56', \"another thing\"")).toBe(true);
    });
    it('returns true for a string in expected list format with comma inside quotes', () => {
      expect(FormatUtils.isList("\"a thing, with another thing\", '1', '56', \"another thing\"")).toBe(true);
    });
    it('returns false for a string that is not in expected list format', () => {
      expect(FormatUtils.isList("a thing")).toBe(false);
    });
  });

});
