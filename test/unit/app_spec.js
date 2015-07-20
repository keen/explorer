var assert = require('chai').assert;
var expect = require('chai').expect;
var App = require('../../client/js/app/app.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../support/TestHelpers.js');
var sinon = require('sinon');

describe('app', function() {
  describe('Constructor', function () {
    it('throws an error if persistence is passed in but no user object is passed in', function () {
      var config = {
        client: {},
        persistence: {}
      };
      expect(function(){
        new App(config)
      }).to.throw("If you initialize Explorer with a persistence layer you must provide a user object as well.");
    });
  });
});