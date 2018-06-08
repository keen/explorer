import _ from 'lodash';
import moment from 'moment';
import TestHelpers from '../../support/TestHelpers';
import ProjectUtils from '../../../lib/js/app/utils/ProjectUtils';
import FormatUtils from '../../../lib/js/app/utils/FormatUtils';
import ProjectStore from '../../../lib/js/app/stores/ProjectStore';
import ProjectActions from '../../../lib/js/app/actions/ProjectActions';

describe('stores/ProjectStore', () => {

  beforeEach(() => {
    ProjectStore.clearAll();
  });

  describe('_create', () => {
    it('should create a new project with the default attributes', () => {
      ProjectActions.create();
      const keys = Object.keys(ProjectStore.getAll());
      expect(_.omit(ProjectStore.getAll()[keys[0]], 'id')).toEqual(
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
      const keys = Object.keys(ProjectStore.getAll());
      expect(_.omit(ProjectStore.getAll()[keys[0]], 'id')).toEqual(
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
      const keys = Object.keys(ProjectStore.getAll());
      ProjectActions.update(keys[0], {
        loading: false,
        schema: {
          name: 'clicks'
        }
      });
      expect(_.omit(ProjectStore.getAll()[keys[0]], 'id')).toEqual(
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
      const keys = Object.keys(ProjectStore.getAll());
      expect(ProjectStore.getProject()).toEqual(ProjectStore.getAll()[keys[0]]);
    });
  });

});
