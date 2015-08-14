var assert = require('chai').assert;
var expect = require('chai').expect;
var request = require('superagent');
var _ = require('lodash');
var sinon = require('sinon');
var RESTPersistence = require('../../../../client/js/app/modules/persistence/REST.js');

describe('modules/persistence/rest', function(){

  beforeEach(function () {
    this.config = {
      baseUrl: 'https://test-bookmarks-keen.io/projects/123/bookmarks'
    };
    this.RESTPersistence = new RESTPersistence(this.config);

    this.bookmarkObj = {
      id: '1',
      name: 'some name',
      query: {
        analysis_type: 'count',
        event_collection: 'activities',
      },
      visualization: {
        chart_type: 'metric'
      }
    };
  });

  it('exists', function(){
    assert.isDefined(RESTPersistence);
  });

  describe('Constructor', function(){
    it('configures itself with a proper baseUrl', function(){
      assert.equal(this.RESTPersistence.config.baseUrl, this.config.baseUrl);
    });

    it('sets up the actions object', function(){
      var actionsObject = {
        getOne:   'GET /{id}',
        getAll:   'GET',
        create:   'POST',
        update:   'PUT /{id}',
        destroy:  'DELETE /{id}'
      };
      assert.deepEqual(this.RESTPersistence.actions, actionsObject);
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
      it('makes a POST request with the right url and body', function(){
        var expectedURL = this.config.baseUrl;
        var expectedRequestBody = {
          name: 'some name',
          query: {
            analysis_type: 'count',
            event_collection: 'activities'
          },
          visualization: {
            chart_type: 'metric'
          }
        };

        this.RESTPersistence.create(this.bookmarkObj);

        assert.isTrue(this.xhrOpenSpy.calledWith('POST', expectedURL, true));
        assert.strictEqual(this.xhrSendStub.getCall(0).args[0], JSON.stringify(expectedRequestBody));
      });
    });

    describe('update function', function(){
      it('makes a PUT request with the right url and body', function(){
        var expectedURL = this.config.baseUrl + '/' + this.bookmarkObj.id;

        var expectedRequestBody = {
          name: 'some name',
          query: {
            analysis_type: 'count',
            event_collection: 'activities'
          },
          visualization: {
            chart_type: 'metric'
          }
        };

        this.RESTPersistence.update(this.bookmarkObj);

        assert.isTrue(this.xhrOpenSpy.calledWith('PUT', expectedURL, true));
        assert.strictEqual(this.xhrSendStub.getCall(0).args[0], JSON.stringify(expectedRequestBody));
      });
    });

    describe('get function', function(){
      it('for a single bookmark it makes a GET request with the right url and body', function(){
        var expectedURL = this.config.baseUrl + '/' + this.bookmarkObj.id;

        this.RESTPersistence.get(this.bookmarkObj.id);

        assert.isTrue(this.xhrOpenSpy.calledWith('GET', expectedURL, true));
        assert.isUndefined(this.xhrSendStub.getCall(0).args[0]);
      });

      it('for all bookmarks it makes a GET request with the right url and body', function(){
        var expectedURL = this.config.baseUrl;
        this.RESTPersistence.get();

        assert.isTrue(this.xhrOpenSpy.calledWith('GET', expectedURL, true));
        assert.isUndefined(this.xhrSendStub.getCall(0).args[0]);
      });
    });

    describe('destroy function', function(){
      it('makes a DELETE request with the right url and body', function(){
        var expectedURL = this.config.baseUrl + '/' + this.bookmarkObj.id;
        this.RESTPersistence.destroy(this.bookmarkObj.id);

        assert.isTrue(this.xhrOpenSpy.calledWith('DELETE', expectedURL, true));
        assert.isUndefined(this.xhrSendStub.getCall(0).args[0]);
      });
    });

  });
});