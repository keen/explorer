import KeenAnalysis from 'keen-analysis';
import XHRmock from 'xhr-mock';

import TestHelpers from '../../support/TestHelpers';
import ProjectActions from '../../../lib/js/app/actions/ProjectActions';
import ProjectUtils from '../../../lib/js/app/utils/ProjectUtils';

describe('actions/ProjectActions', () => {

  describe('fetchCollectionSchema', () => {
    let client;
    let project;
    beforeAll(() => {
      XHRmock.setup();
      project = TestHelpers.createProject();
      client = project.client;
      ProjectActions.create(project);
    });

    afterAll(() => {
      XHRmock.teardown();
    });

    it('should make a request to the right URL', (done) => {
      const expectedURL = `${
          client.config.protocol
        }://${
          client.config.host
        }/${
          client.config.apiVersion
        }/projects/${
          client.config.projectId
        }/events/click?api_key=${
          client.config.masterKey
        }`;

      XHRmock.get(expectedURL,
       (req, res) => {
         expect(req.header('Content-Type')).toEqual('application/json');
         expect(req.header('Authorization')).toEqual(client.masterKey());
         done();
         return res.status(200).body('{}');
      });

      ProjectActions.fetchCollectionSchema(client, 'click');
    });

    it('should encode a / in the collection name', (done) => {
      const expectedURL = `${
          client.config.protocol
        }://${
          client.config.host
        }/${
          client.config.apiVersion
        }/projects/${
          client.config.projectId
        }/events/test%2Ftest?api_key=${
          client.config.masterKey
        }`;

      XHRmock.get(expectedURL,
         (req, res) => {
           done();
           return res.status(200).body('{}');
        });
      ProjectActions.fetchCollectionSchema(client, 'test/test');
    });

    it('should encode a [space] in the collection name', (done) => {
      const expectedURL = `${
          client.config.protocol
        }://${
          client.config.host
        }/${
          client.config.apiVersion
        }/projects/${
          client.config.projectId
        }/events/test%20test?api_key=${
          client.config.masterKey
        }`;
        XHRmock.get(expectedURL,
           (req, res) => {
             done();
             return res.status(200).body('{}');
          });
      ProjectActions.fetchCollectionSchema(client, 'test test');
    });

    it('should encode a hash in the collection name', (done) => {
      const expectedURL = `${
          client.config.protocol
        }://${
          client.config.host
        }/${
          client.config.apiVersion
        }/projects/${
          client.config.projectId
        }/events/test%23test?api_key=${
          client.config.masterKey
        }`;
        XHRmock.get(expectedURL,
           (req, res) => {
             done();
             return res.status(200).body('{}');
          });
      ProjectActions.fetchCollectionSchema(client, 'test#test');
    });

    it('should encode a question mark in the collection name', (done) => {
      const expectedURL = `${
          client.config.protocol
        }://${
          client.config.host
        }/${
          client.config.apiVersion
        }/projects/${
          client.config.projectId
        }/events/test%3Ftest?api_key=${
          client.config.masterKey
        }`;
        XHRmock.get(expectedURL,
           (req, res) => {
             done();
             return res.status(200).body('{}');
          });
      ProjectActions.fetchCollectionSchema(client, 'test?test');
    });

    it('should encode a colon in the collection name', (done) => {
      const expectedURL = `${
          client.config.protocol
        }://${
          client.config.host
        }/${
          client.config.apiVersion
        }/projects/${
          client.config.projectId
        }/events/test%3Atest?api_key=${
          client.config.masterKey
        }`;
        XHRmock.get(expectedURL,
           (req, res) => {
             done();
             return res.status(200).body('{}');
          });
      ProjectActions.fetchCollectionSchema(client, 'test:test');
    });

    it('should encode an ampersand in the collection name', (done) => {
      const expectedURL = `${
          client.config.protocol
        }://${
          client.config.host
        }/${
          client.config.apiVersion
        }/projects/${
          client.config.projectId
        }/events/test%26test?api_key=${
          client.config.masterKey
        }`;
        XHRmock.get(expectedURL,
           (req, res) => {
             done();
             return res.status(200).body('{}');
          });
      ProjectActions.fetchCollectionSchema(client, 'test&test');
    });
  });

});
