var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var ProjectUtils = require('../../../client/js/app/utils/ProjectUtils');
var FormatUtils = require('../../../client/js/app/utils/FormatUtils');
var ProjectStore = require('../../../client/js/app/stores/ProjectStore');
var ProjectActions = require('../../../client/js/app/actions/ProjectActions');

describe('stores/ProjectStore', function() {

  beforeEach(function () {
    ProjectStore.clearAll();
  });

  describe('_create', function () {
    it('should create a new project with the default attributes', function () {
      ProjectActions.create();
      var keys = Object.keys(ProjectStore.getAll());
      assert.deepEqual(
        _.omit(ProjectStore.getAll()[keys[0]], 'id'),
        {
          loading: true,
          eventCollections: [],
          sortedEventCollections: {},
          schema: {}
        }
      );
    });
    it('should create a new project with the provided attributes', function () {
      ProjectActions.create({
        loading: false,
        schema: {
          name: 'clicks'
        }
      });
      var keys = Object.keys(ProjectStore.getAll());
      assert.deepEqual(
        _.omit(ProjectStore.getAll()[keys[0]], 'id'),
        {
          loading: false,
          eventCollections: [],
          sortedEventCollections: {},
          schema: {
            name: 'clicks'
          }
        }
      );
    });
  });

  describe('_update', function () {
    it('should update the expected project with the provided attributes', function () {
      ProjectActions.create();
      var keys = Object.keys(ProjectStore.getAll());
      ProjectActions.update(keys[0], {
        loading: false,
        schema: {
          name: 'clicks'
        }
      });
      assert.deepEqual(
        _.omit(ProjectStore.getAll()[keys[0]], 'id'),
        {
          loading: false,
          eventCollections: [],
          sortedEventCollections: {},
          schema: {
            name: 'clicks'
          }
        }
      );
    });
  });

  describe('getProject', function () {
    it('should return the first project', function () {
      ProjectActions.create();
      var keys = Object.keys(ProjectStore.getAll());
      assert.deepEqual(ProjectStore.getProject(), ProjectStore.getAll()[keys[0]]);
    });
  });

});