var assert = require('chai').assert;
var sinon = require('sinon');
var KeenAnalysis = require('keen-analysis');
var KeenHelpers = require('../../../support/TestHelpers');
var KeenSavedQueries = require('../../../../client/js/app/modules/persistence/KeenSavedQueries.js');

describe('modules/persistence/KeenSavedQueries', function(){

  beforeEach(function () {
    this.config = {
      masterKey: 'fakeKey',
      baseUrl: 'https://test-bookmarks-keen.io/projects/123/queries/saved',
      client: new KeenAnalysis(KeenHelpers.createClient())
    };
    this.KeenSavedQueries = new KeenSavedQueries(this.config);
    this.bookmarkObj = {
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

  it('exists', function(){
    assert.isDefined(KeenSavedQueries);
  });

  describe('Constructor', function(){
    it('configures itself with a proper baseUrl', function(){
      assert.equal(this.KeenSavedQueries.config.baseUrl, this.config.baseUrl);
    });
  });

  describe('Basic CRUD methods', function(){

    beforeEach(function(){
      this.xhrOpenSpy = sinon.spy(XMLHttpRequest.prototype, 'open');
      this.xhrSendStub = sinon.stub(XMLHttpRequest.prototype, 'send');
    });

    afterEach(function(){
      this.xhrOpenSpy.restore();
      this.xhrSendStub.restore();
    });

    describe('create function', function(){
      it('makes a PUT request with the right url and body', function(){
        var expectedURL = this.config.client.url('queries', 'saved', 'some-name');
        var expectedRequestBody = {
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
        this.KeenSavedQueries.create(this.bookmarkObj);
        assert.isTrue(this.xhrOpenSpy.calledWith('PUT', expectedURL, true));
        assert.strictEqual(this.xhrSendStub.getCall(0).args[0], JSON.stringify(expectedRequestBody));
      });
    });

    describe('update function', function(){
      it('makes a PUT request with the right url and body', function(){
        var expectedURL = this.config.client.url('queries', 'saved', 'some-name-original');
        var expectedRequestBody = {
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
        this.KeenSavedQueries.update(this.bookmarkObj);
        assert.isTrue(this.xhrOpenSpy.calledWith('PUT', expectedURL, true));
        assert.strictEqual(this.xhrSendStub.getCall(0).args[0], JSON.stringify(expectedRequestBody));
      });
    });

    describe('get function', function(){
      it('for a single bookmark it makes a GET request with the right url and body', function(){
        var expectedURL = this.config.client.url('queries', 'saved', 'some-name-original', {
          api_key: this.config.client.masterKey()
        });
        expectedURL += '&';
        this.KeenSavedQueries.get(this.bookmarkObj);
        assert.isTrue(this.xhrOpenSpy.calledWith('GET', expectedURL, true));
        assert.isUndefined(this.xhrSendStub.getCall(0).args[0]);
      });

      it('for all bookmarks it makes a GET request with the right url and body', function(){
        var expectedURL = this.config.client.url('queries', 'saved', {
          api_key: this.config.client.masterKey(),
          analysis_type: 'saved'
        });
        this.KeenSavedQueries.get();
        assert.isTrue(this.xhrOpenSpy.calledWith('GET', expectedURL, true));
        assert.isUndefined(this.xhrSendStub.getCall(0).args[0]);
      });
    });

    describe('destroy function', function(){
      it('makes a DELETE request with the right url and body', function(){
        var expectedURL = this.config.client.url('queries', 'saved', 'some-name-original');
        this.KeenSavedQueries.destroy(this.bookmarkObj);
        assert.isTrue(this.xhrOpenSpy.calledWith('DELETE', expectedURL, true));
        assert.isString(this.xhrSendStub.getCall(0).args[0]);
      });
    });
  });
});
