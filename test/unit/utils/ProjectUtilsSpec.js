var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');
var TestHelpers = require('../../support/TestHelpers');
var ProjectActions = require('../../../client/js/app/actions/ProjectActions');
var ProjectUtils = require('../../../client/js/app/utils/ProjectUtils');

describe('utils/ProjectUtils', function() {

  it('exists', function(){
    assert.isDefined(ProjectUtils);
  });

  describe('getConstant', function() {
    it('should return the a project constant', function(){
      var expectedAnalyisTypes = [
        'sum',
        'count',
        'count_unique',
        'minimum',
        'maximum',
        'average',
        'select_unique',
        'extraction',
        'percentile',
        'median'
      ];
      assert.sameMembers(ProjectUtils.getConstant('ANALYSIS_TYPES'), expectedAnalyisTypes);
    });
  });

  describe('constants', function () {
    describe('filter operators', function () {
      describe('eq', function () {
        xit('should return the right coercion types', function () {
          
        });
      });
    });
  });

  describe('fetchProjectSchema', function() {

    before(function() {
      this.xhrOpenStub = sinon.stub(XMLHttpRequest.prototype, 'open');
      this.xhrSendStub = sinon.stub(XMLHttpRequest.prototype, 'send');
      this.client = TestHelpers.createClient();
      this.project = {
        id: 'someId',
        client: this.client
      };
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
      ProjectUtils.fetchProjectSchema(this.project);
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
        this.req = ProjectUtils.fetchProjectSchema(this.project);
        this.req.callback(null, {
          body: TestHelpers.buildProjectSchema()
        });
      });

      it('should update the project with the unpacked project Schema', function () {
        var unpackedSchema = {
          eventCollections: ['click'],
          projectSchema: TestHelpers.buildProjectSchema()
        };
        assert.deepEqual(this.projectUpdateStub.getCall(0).args[1], unpackedSchema);
      });

      it('should update the project loading state', function () {
        assert.deepEqual(this.projectUpdateStub.getCall(1).args[1], { loading: false });
      });      
    });
  });

  describe('getEventCollectionProperties', function(){
    before(function () {
      this.project = { projectSchema: TestHelpers.buildProjectSchema() };
    });

    it('should return an array of properties for a collection which exists', function () {
      var properties = {
        'stringProp': 'string',
        'datetimeProp': 'datetime',
        'numProp': 'num',
        'nullProp': 'null',
        'boolProp': 'bool',
        'listProp': 'list',
        'geoProp': 'geo'
      };
      assert.deepEqual(ProjectUtils.getEventCollectionProperties(this.project, 'click'), properties);
    });

    it('should return an empty object if the collection does not exist', function () {
      assert.deepEqual(ProjectUtils.getEventCollectionProperties(this.project, 'wrong-prop-friend'), {});
    });
  });

  describe('getPropertyType', function () {
    before(function () {
      this.project = { projectSchema: TestHelpers.buildProjectSchema() };
    });

    it('should return the right type of property if it exists ', function () {
      assert.strictEqual(ProjectUtils.getPropertyType(this.project, 'click', 'numProp'), 'num');
      assert.strictEqual(ProjectUtils.getPropertyType(this.project, 'click', 'geoProp'), 'geo');
      assert.strictEqual(ProjectUtils.getPropertyType(this.project, 'click', 'listProp'), 'list');
    });
    
  });

});