var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var FormatUtils = require('../../../client/js/app/utils/FormatUtils');

describe('utils/FormatUtils', function() {
  describe('toTitleCase', function () {
    it('transforms text to titleCase', function () {
      assert.equal(FormatUtils.toTitleCase('keenIO'), 'Keenio');
    });
  });

  describe('singularize', function () {
    it('transforms text to singular', function () {
      assert.equal(FormatUtils.singularize('analytics'), 'analytic');
    });
  });

  describe('prettyPrintJSON', function () {
    it('stringifies the json', function () {
      var json = 'json';
      var stringifySpy = sinon.spy(JSON, 'stringify');
      FormatUtils.prettyPrintJSON(json);
      assert.isTrue(stringifySpy.calledWith(json, undefined, 2));
    });
  });

  describe('sortItems', function() {
    it('sorts things', function() {
      var sortedItems = FormatUtils.sortItems(['b', 'a']);
      assert.deepEqual(sortedItems, ['a', 'b']);
    });
    // x'd because phantomJs < 2.0.0 localeCompare fails; 2.0.0 is released but
    // is not yet listed on npm.
    xit('sorts unicode properly', function() {
      var sortedItems = FormatUtils.sortItems(['a', 'n', 'b', 'z', 'ñ']);
      assert.deepEqual(sortedItems, ['a', 'b', 'n', 'ñ', 'z']);
    });
    it('ignores dash, underscore, case, and period', function() {
      var sortedItems = FormatUtils.sortItems(['-ad', 'a_e', 'A.f', 'a-c', 'Ab']);
      assert.deepEqual(sortedItems, ['Ab', 'a-c', '-ad', 'a_e', 'A.f']);
    });
  })

  describe('coercionTypeForPropertyType', function () {
    it("returns 'String' for string", function () {
      var propertyType = 'string';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'String');
    });
    it("returns 'Number' for num", function () {
      var propertyType = 'num';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'Number');
    });
    it("returns 'Datetime' for datetime", function () {
      var propertyType = 'datetime';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'Datetime');
    });
    it("returns 'List' for list", function () {
      var propertyType = 'list';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'List');
    });
    it("returns 'Null' for null", function () {
      var propertyType = 'null';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'Null');
    });
    it("returns 'Boolean' for boolean", function () {
      var propertyType = 'bool';
      assert.equal(FormatUtils.coercionTypeForPropertyType(propertyType), 'Boolean');
    });
  });

  describe('formatISOTimeNoTimezone', function () {
    it('formats as ISO time without a timezone', function () {
      var time = moment('2014-08-20 15:44').format();
      assert.match(FormatUtils.formatISOTimeNoTimezone(time), /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}/);
    });
  });

  describe('booleanMap', function () {
    it('maps correctly for strings', function () {
      assert.strictEqual(FormatUtils.booleanMap('true'), 'true');
      assert.strictEqual(FormatUtils.booleanMap('false'), 'false');
    });

    it('maps correctly for null', function () {
      assert.strictEqual(FormatUtils.booleanMap(null), '');
    });

    it('maps correctly for booleans', function () {
      assert.strictEqual(FormatUtils.booleanMap(true), 'true');
      assert.strictEqual(FormatUtils.booleanMap(false), 'false');
    });

    it('maps correctly for truthy values', function () {
      assert.strictEqual(FormatUtils.booleanMap(1), 'true');
      assert.strictEqual(FormatUtils.booleanMap('abc'), 'true');
    });
  });

  describe('isValidQueryValue', function () {
    it('should return true for arrays with one or more values', function () {
      assert.isTrue(FormatUtils.isValidQueryValue(['one']));
    });

    it('should return false for empty arrays', function () {
      assert.isFalse(FormatUtils.isValidQueryValue([]));
    });

    it('should return false for null values', function () {
      assert.isFalse(FormatUtils.isValidQueryValue(null));
    });

    it('should return false for undefined values', function () {
      assert.isFalse(FormatUtils.isValidQueryValue(undefined));
    });

    it('should return true for false', function () {
      assert.isTrue(FormatUtils.isValidQueryValue(false));
    });

    it('should return true for numeric 0', function () {
      assert.isTrue(FormatUtils.isValidQueryValue(0));
    });
  });

  describe('parseList', function () {
    describe('Strings', function () {
      it('splits a string on commas', function () {
        var input = '"apple", "orange"';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, ['apple', 'orange']);
      });
      it('respects internal commas and whitespace in a double quoted string', function () {
        var input = '"apple, banana", "orange"';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, ['apple, banana', 'orange']);
      });
      it('respects numbers wrapped in double quotes as strings', function () {
        var input = '"1", "1.25"';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, ['1', '1.25']);
      });
      it('respects quoted strings', function () {
        var input = '"\'to be or not to be\'", "that is the question"';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, ['\'to be or not to be\'', 'that is the question']);
      });
    });
    describe('Numbers', function () {
      it('treats numbers wrapped in single quotes as numbers', function () {
        var input = '\'1\', \'1.25\'';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, [
          1, 1.25]);
      });
    });
    describe('Mixed', function () {
      it('allows for mixed types', function () {
        var input = '"a, banana", \'1\', "1.25"';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, ['a, banana', 1, '1.25']);
      });
    });
    describe('Incorrect', function () {
      it('returns empty string for values that are not lists', function () {
        var input = 'some name';
        var parsedList = FormatUtils.parseList(input);
        assert.deepEqual(parsedList, '');
      });
    });
  });

  describe('isList', function () {
    it('returns true for a string in expected list format', function () {
      assert.isTrue(FormatUtils.isList("\"a thing\", '1', '56', \"another thing\""));
    });
    it('returns true for a string in expected list format with comma inside quotes', function () {
      assert.isTrue(FormatUtils.isList("\"a thing, with another thing\", '1', '56', \"another thing\""));
    });
    it('returns false for a string that is not in expected list format', function () {
      assert.isFalse(FormatUtils.isList("a thing"));
    });
  });

});