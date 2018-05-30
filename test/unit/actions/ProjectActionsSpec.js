
let sinon from 'sinon/pkg/sinon.js');
var TestHelpers from '../../support/TestHelpers');
var ProjectActions from '../../../lib/js/app/actions/ProjectActions');
var ProjectUtils from '../../../lib/js/app/utils/ProjectUtils');
var KeenAnalysis from 'keen-analysis');

describe('actions/ProjectActions', () => {

  describe('fetchCollectionSchema', () => {

    before(() => {
      this.xhrOpenStub = sinon.stub(XMLHttpRequest.prototype, 'open');
      this.xhrSendStub = sinon.stub(XMLHttpRequest.prototype, 'send');
      this.client = new KeenAnalysis(TestHelpers.createClient());
      ProjectActions.create({
        id: 'someId',
        client: this.client
      })
    });

    after(() => {
      this.xhrOpenStub.restore();
      this.xhrSendStub.restore();
    });

    it('should make a request to the right URL', () => {
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

    it('should encode a / in the collection name', () => {
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

    it('should encode a [space] in the collection name', () => {
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

    it('should encode a hash in the collection name', () => {
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

    it('should encode a question mark in the collection name', () => {
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

    it('should encode a colon in the collection name', () => {
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

    it('should encode an ampersand in the collection name', () => {
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
