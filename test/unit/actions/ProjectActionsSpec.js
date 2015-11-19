var assert = require('chai').assert;
var sinon = require('sinon');
var TestHelpers = require('../../support/TestHelpers');
var ProjectActions = require('../../../client/js/app/actions/ProjectActions');
var ProjectUtils = require('../../../client/js/app/utils/ProjectUtils');

describe('actions/ProjectActions', function() {

  describe('fetchProjectSchema', function() {

    before(function() {
      this.xhrOpenStub = sinon.stub(XMLHttpRequest.prototype, 'open');
      this.xhrSendStub = sinon.stub(XMLHttpRequest.prototype, 'send');
      this.client = TestHelpers.createClient();
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
                        '/events?api_key=' +
                        this.client.config.masterKey;
      ProjectActions.fetchProjectSchema();
      this.xhrOpenStub.calledWith('GET', expectedURL, true);
    });

    describe('calling project update actions', function () {
      before(function () {
        this.projectUpdateStub = sinon.stub(ProjectActions, 'update');
      });

      after(function () {
        ProjectActions.update.restore();
      });

      beforeEach(function () {
        var req = ProjectActions.fetchProjectSchema();
        req.callback(null, { body: TestHelpers.buildProjectSchema() });
      });

      it('should update the project with the unpacked project Schema', function () {
        var expectedUpdates = {
          loading: false,
          eventCollections: ['click'],
          schema: TestHelpers.buildProjectSchema()
        };
        assert.deepEqual(this.projectUpdateStub.getCall(0).args[1], expectedUpdates);
      });

      it('should update the project loading state', function () {
        assert.deepPropertyVal(this.projectUpdateStub.getCall(0).args[1], 'loading', false);
      });      
    });
  });

});