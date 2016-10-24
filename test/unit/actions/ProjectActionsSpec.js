var assert = require('chai').assert;
var sinon = require('sinon');
var TestHelpers = require('../../support/TestHelpers');
var ProjectActions = require('../../../client/js/app/actions/ProjectActions');
var ProjectUtils = require('../../../client/js/app/utils/ProjectUtils');
var KeenAnalysis = require('keen-analysis');

describe('actions/ProjectActions', function() {

  describe('fetchCollectionSchema', function() {

    before(function() {
      this.xhrOpenStub = sinon.stub(XMLHttpRequest.prototype, 'open');
      this.xhrSendStub = sinon.stub(XMLHttpRequest.prototype, 'send');
      this.client = new KeenAnalysis(TestHelpers.createClient());
      ProjectActions.create({
        id: 'someId',
        client: this.client
      })
    });

    after(function(){
      this.xhrOpenStub.restore();
      this.xhrSendStub.restore();
    });

    it('should make a request to the right URL', function () {
      var expectedURL = this.client.config.protocol +
                        "://" +
                        this.client.config.host +
                        '/projects/' +
                        this.client.config.projectId +
                        '/events/test?api_key=' +
                        this.client.config.masterKey;
      ProjectActions.fetchCollectionSchema(this.client, 'test');
      this.xhrOpenStub.calledWith('GET', expectedURL, true);
    });

    it('should encode a / in the collection name', function() {
      var expectedURL = this.client.config.protocol +
        "://" +
        this.client.config.host +
        '/projects/' +
        this.client.config.projectId +
        '/events/test%2ftest?api_key=' +
        this.client.config.masterKey;
      ProjectActions.fetchCollectionSchema(this.client, 'test/test');
      this.xhrOpenStub.calledWith('GET', expectedURL, true);
    });

    it('should encode a [space] in the collection name', function() {
      var expectedURL = this.client.config.protocol +
        "://" +
        this.client.config.host +
        '/projects/' +
        this.client.config.projectId +
        '/events/test%20test?api_key=' +
        this.client.config.masterKey;
      ProjectActions.fetchCollectionSchema(this.client, 'test test');
      this.xhrOpenStub.calledWith('GET', expectedURL, true);
    });

    it('should encode a hash in the collection name', function() {
      var expectedURL = this.client.config.protocol +
          "://" +
          this.client.config.host +
          '/projects/' +
          this.client.config.projectId +
          '/events/test%26test?api_key=' +
          this.client.config.masterKey;
      ProjectActions.fetchCollectionSchema(this.client, 'test#test');
      this.xhrOpenStub.calledWith('GET', expectedURL, true);
    });

    it('should encode a question mark in the collection name', function() {
      var expectedURL = this.client.config.protocol +
          "://" +
          this.client.config.host +
          '/projects/' +
          this.client.config.projectId +
          '/events/test%3Ftest?api_key=' +
          this.client.config.masterKey;
      ProjectActions.fetchCollectionSchema(this.client, 'test?test');
      this.xhrOpenStub.calledWith('GET', expectedURL, true);
    });

    it('should encode a colon in the collection name', function() {
      var expectedURL = this.client.config.protocol +
          "://" +
          this.client.config.host +
          '/projects/' +
          this.client.config.projectId +
          '/events/test%3Atest?api_key=' +
          this.client.config.masterKey;
      ProjectActions.fetchCollectionSchema(this.client, 'test:test');
      this.xhrOpenStub.calledWith('GET', expectedURL, true);
    });

    it('should encode an ampersand in the collection name', function() {
      var expectedURL = this.client.config.protocol +
          "://" +
          this.client.config.host +
          '/projects/' +
          this.client.config.projectId +
          '/events/test%26test?api_key=' +
          this.client.config.masterKey;
      ProjectActions.fetchCollectionSchema(this.client, 'test&test');
      this.xhrOpenStub.calledWith('GET', expectedURL, true);
    });

  });

});
