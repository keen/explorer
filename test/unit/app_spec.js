
import React from 'react';
import XHRmock from 'xhr-mock';
import KeenAnalysis from 'keen-analysis';

import mockQs from 'qs';
import mock_ from 'lodash';

import KeenExplorer from '../../lib/js/app/app';

jest.mock('../../lib/js/app/utils/QueryStringUtils', () => {
  return {
    getSearchString: () => {
      return;
    },

    updateSearchString: (queryStringData) => {
      let urlPath;
      if (mock_.keys(queryStringData).length) {
        urlPath = '?' + mockQs.stringify(queryStringData);
      } else {
        // urlPath = window.location.origin + window.location.pathname
      }
      // window.history.pushState({ model: queryStringData }, "", urlPath);
    },

    getQueryAttributes: () => {
      const windowSearchString = '?query%5Bevent_collection%5D=pageviews&query%5Banalysis_type%5D=count&query%5Btimezone%5D=Europe%2FParis&query%5Btimeframe%5D=this_14_days';
      return mockQs.parse(windowSearchString.replace('?', ''), { depth: 7 });
    }
  };
});

describe('KeenExplorer App', () => {
  const mockFn1 = jest.fn();
  const clientConfig = {
    projectId: 'proj111',
    readKey: 'read222',
    writeKey: 'write444',
    masterKey: 'master333',
    protocol: 'https',
    requestType: 'xhr'
  };
  const analysisClient = new KeenAnalysis(clientConfig);

  beforeEach(() => {
    XHRmock.setup();
    document.body.innerHTML = '<div id="explorer"></div>';
  });

  afterEach(() => {
    XHRmock.teardown();
  });

  it('runs a query to detect project resources', (done) => {
    XHRmock.get(
      new RegExp(analysisClient.url('projectId')),
      (req, res) => {
        expect(req.header('Content-Type')).toEqual('application/json');
        expect(req.header('Authorization')).toEqual(clientConfig.masterKey);
        done();
        return res.status(200).body('{}');
      }
    );

    const explorerApp = new KeenExplorer('#explorer').client(clientConfig);
  });

  it('runs a query if the querystring has query attrs in it', (done) => {
    XHRmock.get(
      new RegExp(analysisClient.url('projectId')),
      (req, res) => {
        return res.status(200).body(JSON.stringify([]));
      }
    );

    XHRmock.post(
      new RegExp(analysisClient.url('projectId', 'queries')),
      (req, res) => {
        expect(req.header('Content-Type')).toEqual('application/json');
        expect(req.header('Authorization')).toEqual(clientConfig.readKey);
        done();
        return res.status(200).body('[]');
      }
    );

    const explorerApp = new KeenExplorer('#explorer')
      .client(clientConfig)
      .persistence(true)
      .fetch();

  });

});
