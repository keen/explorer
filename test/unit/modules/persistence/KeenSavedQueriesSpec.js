import KeenAnalysis from 'keen-analysis';
import KeenHelpers from '../../../support/TestHelpers';
import KeenSavedQueries from '../../../../lib/js/app/modules/persistence/KeenSavedQueries';
import XHRmock from 'xhr-mock';

describe('modules/persistence/KeenSavedQueries', () => {
  let config;
  let KeenSavedQueriesObj;
  let bookmarkObj;

  beforeAll(()=>{
    XHRmock.setup();
  });

  afterAll(()=>{
    XHRmock.teardown();
  });

  beforeEach(() => {
    config = {
      masterKey: 'fakeKey',
      baseUrl: 'https://test-bookmarks-keen.io/projects/123/queries/saved',
      client: new KeenAnalysis(KeenHelpers.createClient())
    };
    KeenSavedQueriesObj = new KeenSavedQueries(config);
    bookmarkObj = {
      id: 'some-name-original',
      query_name: 'some-name',
      query: {
        analysis_type: 'count',
        event_collection: 'activities',
      },
      metadata: {
        visualization: { chart_type: 'metric' },
        display_name: 'some name',
      }
    };
  });

  it('exists', () => {
    expect(KeenSavedQueriesObj).not.toBe(undefined);
  });

  describe('Constructor', () => {
    it('configures itself with a proper baseUrl', () => {
      expect(KeenSavedQueriesObj.config.baseUrl).toEqual(config.baseUrl);
    });
  });

  describe('Basic CRUD methods', () => {

    describe('create function', () => {
      it('makes a PUT request with the right url and body', (done) => {
        const expectedURL = config.client.url('queries', 'saved', 'some-name');
        const expectedRequestBody = {
          query_name: 'some-name',
          query: {
            analysis_type: 'count',
            event_collection: 'activities'
          },
          metadata: {
            visualization: { chart_type: 'metric' },
            display_name: 'some name'
          }
        };
        XHRmock.put(expectedURL,
          (req, res) => {
            expect(JSON.parse(req.body())).toMatchObject(expectedRequestBody);
            done();
            return res.status(200).body({});
          });
        KeenSavedQueriesObj.create(bookmarkObj);
      });
    });

    describe('update function', () => {
      it('makes a PUT request with the right url and body', (done) => {
        const expectedURL = config.client.url('queries', 'saved', 'some-name-original');
        const expectedRequestBody = {
          query_name: 'some-name',
          query: {
            analysis_type: 'count',
            event_collection: 'activities'
          },
          metadata: {
            visualization: { chart_type: 'metric' },
            display_name: 'some name'
          }
        };
        XHRmock.put(expectedURL,
          (req, res) => {
            expect(JSON.parse(req.body())).toMatchObject(expectedRequestBody);
            done();
            return res.status(200).body({});
          });

        KeenSavedQueriesObj.update(bookmarkObj);
      });
    });

    describe('get function', () => {
      it('for a single bookmark it makes a GET request with the right url and body', (done) => {
        let expectedURL = config.client.url('queries', 'saved', 'some-name-original', {
          api_key: config.client.masterKey()
        });
        XHRmock.get(expectedURL,
          (req, res) => {
            done();
            return res.status(200).body({});
          });

        KeenSavedQueriesObj.get(bookmarkObj);
      });
    });

    it('for all bookmarks it makes a GET request with the right url and body', (done) => {
      const expectedURL = config.client.url('queries', 'saved', {
        api_key: config.client.masterKey(),
        analysis_type: 'saved'
      });
      XHRmock.get(expectedURL,
        (req, res) => {
          done();
          return res.status(200).body({});
        });

      KeenSavedQueriesObj.get();
    });
/*
XHR mock bug with DELETE requests - TODO migrate to fetch mock
    describe('destroy function', () => {
      it('makes a DELETE request with the right url and body', (done) => {
        const expectedURL = config.client.url('queries', 'saved', 'some-name-original');
        XHRmock.delete(expectedURL,
          (req, res) => {
            done();
            return res.status(200);
          });
        KeenSavedQueriesObj.destroy(bookmarkObj);
      });
    });
*/
  });
});
