var assert = require('chai').assert;
var expect = require('chai').expect;
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
        assert.deepEqual(NoticeStore.getNotice(), {
          type: 'info',
          icon: 'info-sign',
          text: 'Saving query...'
        });
      });
      it('should create the right notice with the "update" saveType', function () {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVING,
          saveType: 'update',
          id: 1
        });
        assert.deepEqual(NoticeStore.getNotice(), {
          type: 'info',
          icon: 'info-sign',
          text: 'Updating query...'
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
        assert.deepEqual(NoticeStore.getNotice(), {
          type: 'success',
          icon: 'ok',
          text: 'Query saved.'
        });
      });
      it('should create the right notice with the "update" saveType', function () {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_SUCCESS,
          saveType: 'update',
          id: 1
        });
        assert.deepEqual(NoticeStore.getNotice(), {
          type: 'success',
          icon: 'ok',
          text: 'Query updated.'
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
        assert.deepEqual(NoticeStore.getNotice(), {
          type: 'error',
          icon: 'remove-sign',
          text: 'Problem saving: ' + errorMessage
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
        assert.deepEqual(NoticeStore.getNotice(), {
          type: 'error',
          icon: 'remove-sign',
          text: 'Problem updating: ' + errorMessage
        });
      });
    });

    describe('EXPLORER_DESTROYING actionType', function () {
      it('should create the right notice', function () {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROYING,
          id: 1
        });
        assert.deepEqual(NoticeStore.getNotice(), {
          type: 'info',
          text: 'Deleting query...',
          icon: 'info-sign'
        });
      });
    });

    describe('EXPLORER_DESTROY_SUCCESS actionType', function () {
      it('should create the right notice', function () {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROY_SUCCESS
        });
        assert.deepEqual(NoticeStore.getNotice(), {
          type: 'success',
          text: 'Query deleted.',
          icon: 'ok'
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
        assert.deepEqual(NoticeStore.getNotice(), {
          type: 'error',
          text: 'There was a problem deleting your query: ' + errorMsg,
          icon: 'remove-sign'
        });
      });
    });    
  });

});