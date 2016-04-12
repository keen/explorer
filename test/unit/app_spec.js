var assert = require('chai').assert;
var App = require('../../client/js/app/app.js');
var QueryStringUtils =  require('../../client/js/app/utils/QueryStringUtils.js');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var TestHelpers = require('../support/TestHelpers.js');
var sinon = require('sinon');

describe('App', function() {
  it('runs a query if the querystring has query attrs in it', function () {
    var queryAttributesStub = sinon.stub(QueryStringUtils, 'getQueryAttributes').returns({
      query: {
        event_collection: 'pageview',
        analysis_type: 'count',
        time: {
          relativity: 'this',
          amount: 14,
          sub_timeframe: 'days'
        }
      }
    });
    var xhrOpenStub = sinon.stub(XMLHttpRequest.prototype, 'open');
    var xhrSendStub = sinon.stub(XMLHttpRequest.prototype, 'send');

    var clientConfig = TestHelpers.createClient();
    var app = new App('#explorer').client(clientConfig);

    assert.isTrue(queryAttributesStub.calledOnce);

    QueryStringUtils.getQueryAttributes.restore();
    xhrOpenStub.restore();
    xhrSendStub.restore();
  });
});
