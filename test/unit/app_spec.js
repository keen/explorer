
import KeenExplorer from '../../lib/js/app/app';
import QueryStringUtils from '../../lib/js/app/utils/QueryStringUtils.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TestHelpers from '../support/TestHelpers.js';
import sinon from 'sinon/pkg/sinon.js';

describe('KeenExplorer App', () => {
  it('runs a query if the querystring has query attrs in it', () => {
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
    var app = new KeenExplorer('#explorer').client(clientConfig);

    expect(queryAttributesStub.calledOnce).toBe(true);

    QueryStringUtils.getQueryAttributes.restore();
    xhrOpenStub.restore();
    xhrSendStub.restore();
  });
});
