var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var AppDispatcher = require('../../../client/js/app/dispatcher/AppDispatcher');
var ExplorerConstants = require('../../../client/js/app/constants/ExplorerConstants');
var NoticeStore = require('../../../client/js/app/stores/NoticeStore');
var ExplorerStore = require('../../../client/js/app/stores/ExplorerStore');
var ExplorerActions = require('../../../client/js/app/actions/ExplorerActions');

describe('stores/NoticeStore', function() {

  describe('dispatcher callback', function () {
    beforeEach(function () {
      NoticeStore.clearAll();
      ExplorerStore.clearAll();
      ExplorerActions.create({ id: 1 });
    });

    describe('EXPLORER_SAVING actionType', function () {
      it('should create the right notice with the "save" saveType', function () { 
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVING,
          saveType: 'save',
          id: 1
        });
        assert.deepEqual(NoticeStore.getGlobalNotice(), {
          type: 'info',
          icon: 'info-sign',
          text: 'Saving query...',
          location: 'global'
        });
      });
      it('should create the right notice with the "update" saveType', function () {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVING,
          saveType: 'update',
          id: 1
        });
        assert.deepEqual(NoticeStore.getGlobalNotice(), {
          type: 'info',
          icon: 'info-sign',
          text: 'Updating query...',
          location: 'global'
        });
      });
    });

    describe('EXPLORER_SAVE_SUCCESS actionType', function () {
      it('should create the right notice with the "save" saveType', function () {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_SUCCESS,
          saveType: 'save',
          id: 1
        });
        assert.deepEqual(NoticeStore.getGlobalNotice(), {
          type: 'success',
          icon: 'ok',
          text: 'Query saved.',
          location: 'global'
        });
      });
      it('should create the right notice with the "update" saveType', function () {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_SUCCESS,
          saveType: 'update',
          id: 1
        });
        assert.deepEqual(NoticeStore.getGlobalNotice(), {
          type: 'success',
          icon: 'ok',
          text: 'Query updated.',
          location: 'global'
        });
      });
    });

    describe('EXPLORER_SAVE_FAIL actionType', function () {
      it('should create the right notice with the "save" saveType', function () {
        var errorMessage = 'there was an error with saving'
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_FAIL,
          saveType: 'save',
          errorMsg: errorMessage,
          id: 1
        });
        assert.deepEqual(NoticeStore.getGlobalNotice(), {
          type: 'error',
          icon: 'remove-sign',
          text: 'Problem saving: ' + errorMessage,
          location: 'global'
        });
      });
      it('should create the right notice with the "update" saveType', function () {
        var errorMessage = 'there was an error with updating'
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_FAIL,
          saveType: 'update',
          errorMsg: errorMessage,
          id: 1
        });
        assert.deepEqual(NoticeStore.getGlobalNotice(), {
          type: 'error',
          icon: 'remove-sign',
          text: 'Problem updating: ' + errorMessage,
          location: 'global'
        });
      });
    });

    describe('EXPLORER_DESTROYING actionType', function () {
      it('should create the right notice', function () {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROYING,
          id: 1
        });
        assert.deepEqual(NoticeStore.getGlobalNotice(), {
          type: 'info',
          text: 'Deleting query...',
          icon: 'info-sign',
          location: 'global'
        });
      });
    });

    describe('EXPLORER_DESTROY_SUCCESS actionType', function () {
      it('should create the right notice', function () {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROY_SUCCESS
        });
        assert.deepEqual(NoticeStore.getGlobalNotice(), {
          type: 'success',
          text: 'Query deleted.',
          icon: 'ok',
          location: 'global'
        });
      });
    });

    describe('EXPLORER_DESTROY_FAIL actionType', function () {
      it('should create the right notice', function () {
        var errorMsg = 'there was a destroy error';
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROY_FAIL,
          id: 1,
          errorMsg: errorMsg
        });
        assert.deepEqual(NoticeStore.getGlobalNotice(), {
          type: 'error',
          text: 'There was a problem deleting your query: ' + errorMsg,
          icon: 'remove-sign',
          location: 'global'
        });
      });
    });

    describe('EXPLORER_FOUND_INVALID actionType', function () {
      it('should create one notice for each invalid step of a funnel query', function () {
        ExplorerActions.create({
          id: 'abc123',
          errors: [{ msg: 'An error' }],
          isValid: false,
          query: {
            analysis_type: 'funnel',
            steps: [
              _.assign(TestHelpers.createStep(), {
                isValid: false,
                errors: [
                  { msg: 'step 1 invalid' },
                  { msg: 'step 1 invalid two' }
                ]
              }),
              _.assign(TestHelpers.createStep(), {
                isValid: true
              }),
              _.assign(TestHelpers.createStep(), {
                isValid: false,
                errors: [
                  { msg: 'step 3 invalid' },
                  { msg: 'step 3 invalid two' }
                ]
              })
            ]
          }
        });
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_FOUND_INVALID,
          id: 'abc123'
        });
        assert.lengthOf(NoticeStore.getStepNotices(), 2, 'number of notices');
        assert.deepEqual(NoticeStore.getStepNotices()[0], {
          id: 'abc123',
          location: 'step',
          stepIndex: 0,
          text: 'step 1 invalid',
          type: 'error',
          icon: 'remove-sign'
        }, 'first step quality');
        assert.deepEqual(NoticeStore.getStepNotices()[1], {
          id: 'abc123',
          location: 'step',
          stepIndex: 2,
          text: 'step 3 invalid',
          type: 'error',
          icon: 'remove-sign'
        }, 'second step equality');
      });
    });
  });

});