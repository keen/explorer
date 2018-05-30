
var expect from 'chai').expect;
var _ from 'lodash');
let sinon from 'sinon/pkg/sinon.js');
var moment from 'moment');
var TestHelpers from '../../support/TestHelpers');
var FormatUtils from '../../../lib/js/app/utils/FormatUtils');

describe('utils/FormatUtils', () => {
  describe('toTitleCase', () => {
    it('transforms text to titleCase', () => {
      assert.equal(FormatUtils.toTitleCase('keenIO'), 'Keenio');
    });
  });

  describe('singularize', () => {
    it('transforms text to singular', () => {
      assert.equal(FormatUtils.singularize('analytics'), 'analytic');
    });
  });

  describe('prettyPrintJSON', () => {
    it('stringifies the json', () => {
      var json = 'json';
      var stringifySpy = sinon.spy(JSON, 'stringify');
      FormatUtils.prettyPrintJSON(json);
      assert.isTrue(stringifySpy.calledWith(json, undefined, 2));
    });
  });

  describe('sortItems', () => {
    it('sorts things', () => {
      var sortedItems = FormatUtils.sortItems(['b', 'a']);
      assert.deepEqual(sortedItems, ['a', 'b']);
    });
    // x'd because phantomJs < 2.0.0 localeCompare fails; 2.0.0 is released but
    // is not yet listed on npm.
    xit('sorts unicode properly', () => {
      var sortedItems = FormatUtils.sortItems(['a', 'n', 'b', 'z', 'ñ']);
      assert.deepEqual(sortedItems, ['a', 'b', 'n', 'ñ', 'z']);
    });
    it('ignores dash, underscore, case, and period', () => {
      var sortedItems = FormatUtils.sortItems(['-ad', 'a_e', 'A.f', 'a-c', 'Ab']);
      assert.deepEqual(sortedItems, ['Ab', 'a-c', '-ad', 'a_e', 'A.f']);
    });
  })

  describe('coercionTypeForPropertyType', () => {
    it("returns 'String' for string", () => {
      var propertyType = 'string';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'String');
    });
    it("returns 'Number' for num", () => {
      var propertyType = 'num';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'Number');
    });
    it("returns 'Datetime' for datetime", () => {
      var propertyType = 'datetime';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'Datetime');
    });
    it("returns 'List' for list", () => {
      var propertyType = 'list';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'List');
    });
    it("returns 'Null' for null", () => {
      var propertyType = 'null';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'Null');
    });
    it("returns 'Boolean' for boolean", () => {
      var propertyType = 'bool';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'Boolean');
    });
  });

  describe('formatISOTimeNoTimezone', () => {
    it('formats as ISO time without a timezone', () => {
      var time = moment('2014-08-20 15:44').format();
      assert.match(FormatUtils.formatISOTimeNoTimezone(time), /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}/);
    });
  });

  describe('booleanMap', () => {
    it('maps correctly for strings', () => {
      assert.strictEqual(FormatUtils.booleanMap('true'), 'true');
      assert.strictEqual(FormatUtils.booleanMap('false'), 'false');
    });

    it('maps correctly for null', () => {
      assert.strictEqual(FormatUtils.booleanMap(null), '');
    });

    it('maps correctly for booleans', () => {
      assert.strictEqual(FormatUtils.booleanMap(true), 'true');
      assert.strictEqual(FormatUtils.booleanMap(false), 'false');
    });

    it('maps correctly for truthy values', () => {
      assert.strictEqual(FormatUtils.booleanMap(1), 'true');
      assert.strictEqual(FormatUtils.booleanMap('abc'), 'true');
    });
  });

  describe('isValidQueryValue', () => {
    it('should return true for arrays with one or more values', () => {
      assert.isTrue(FormatUtils.isValidQueryValue(['one']));
    });

    it('should return false for empty arrays', () => {
      assert.isFalse(FormatUtils.isValidQueryValue([]));
    });

    it('should return false for null values', () => {
      assert.isFalse(FormatUtils.isValidQueryValue(null));
    });

    it('should return false for undefined values', () => {
      assert.isFalse(FormatUtils.isValidQueryValue(undefined));
    });

    it('should return true for false', () => {
      assert.isTrue(FormatUtils.isValidQueryValue(false));
    });

    it('should return true for numeric 0', () => {
      assert.isTrue(FormatUtils.isValidQueryValue(0));
    });
  });

  describe('parseList', () => {
    describe('Strings', () => {
      it('splits a string on commas', () => {
        var input = '"apple", "orange"';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, ['apple', 'orange']);
      });
      it('respects internal commas and whitespace in a double quoted string', () => {
        var input = '"apple, banana", "orange"';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, ['apple, banana', 'orange']);
      });
      it('respects numbers wrapped in double quotes as strings', () => {
        var input = '"1", "1.25"';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, ['1', '1.25']);
      });
      it('respects quoted strings', () => {
        var input = '"\'to be or not to be\'", "that is the question"';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, ['\'to be or not to be\'', 'that is the question']);
      });
    });
    describe('Numbers', () => {
      it('treats numbers wrapped in single quotes as numbers', () => {
        var input = '\'1\', \'1.25\'';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, [
          1, 1.25]);
      });
    });
    describe('Mixed', () => {
      it('allows for mixed types', () => {
        var input = '"a, banana", \'1\', "1.25"';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, ['a, banana', 1, '1.25']);
      });
    });
    describe('Incorrect', () => {
      it('returns empty string for values that are not lists', () => {
        var input = 'some name';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, '');
      });
    });
  });

  describe('isList', () => {
    it('returns true for a string in expected list format', () => {
      assert.isTrue(FormatUtils.isList("\"a thing\", '1', '56', \"another thing\""));
    });
    it('returns true for a string in expected list format with comma inside quotes', () => {
      assert.isTrue(FormatUtils.isList("\"a thing, with another thing\", '1', '56', \"another thing\""));
    });
    it('returns false for a string that is not in expected list format', () => {
      assert.isFalse(FormatUtils.isList("a thing"));
    });
  });

});
