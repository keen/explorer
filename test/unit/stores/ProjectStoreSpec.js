
var _ from 'lodash');
let sinon from 'sinon/pkg/sinon.js');
var moment from 'moment');
var TestHelpers from '../../support/TestHelpers');
var ProjectUtils from '../../../lib/js/app/utils/ProjectUtils');
var FormatUtils from '../../../lib/js/app/utils/FormatUtils');
var ProjectStore from '../../../lib/js/app/stores/ProjectStore');
var ProjectActions from '../../../lib/js/app/actions/ProjectActions');

describe('stores/ProjectStore', () => {

  beforeEach(() => {
    ProjectStore.clearAll();
  });

  describe('_create', () => {
    it('should create a new project with the default attributes', () => {
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
    it('should create a new project with the provided attributes', () => {
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

  describe('_update', () => {
    it('should update the expected project with the provided attributes', () => {
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

  describe('getProject', () => {
    it('should return the first project', () => {
      ProjectActions.create();
      var keys = Object.keys(ProjectStore.getAll());
      assert.deepEqual(ProjectStore.getProject(), ProjectStore.getAll()[keys[0]]);
    });
  });

});