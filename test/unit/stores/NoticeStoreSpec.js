import _ from 'lodash';
import moment from 'moment';
import TestHelpers from '../../support/TestHelpers';
import AppDispatcher from '../../../lib/js/app/dispatcher/AppDispatcher';
import ExplorerConstants from '../../../lib/js/app/constants/ExplorerConstants';
import NoticeStore from '../../../lib/js/app/stores/NoticeStore';
import ExplorerStore from '../../../lib/js/app/stores/ExplorerStore';
import ExplorerActions from '../../../lib/js/app/actions/ExplorerActions';

describe('stores/NoticeStore', () => {

  describe('dispatcher callback', () => {
    beforeEach(() => {
      NoticeStore.clearAll();
      ExplorerStore.clearAll();
      ExplorerActions.create({ id: 1 });
    });

    describe('EXPLORER_SAVING actionType', () => {
      it('should create the right notice with the "save" saveType', () => {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVING,
          saveType: 'save',
          id: 1
        });
        expect(NoticeStore.getGlobalNotice()).toEqual({
          type: 'info',
          icon: 'info-sign',
          text: 'Saving query...',
          location: 'global'
        });
      });
      it('should create the right notice with the "update" saveType', () => {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVING,
          saveType: 'update',
          id: 1
        });
        expect(NoticeStore.getGlobalNotice()).toEqual({
          type: 'info',
          icon: 'info-sign',
          text: 'Updating query...',
          location: 'global'
        });
      });
    });

    describe('EXPLORER_SAVE_SUCCESS actionType', () => {
      it('should create the right notice with the "save" saveType', () => {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_SUCCESS,
          saveType: 'save',
          id: 1
        });
        expect(NoticeStore.getGlobalNotice()).toEqual({
          type: 'success',
          icon: 'ok',
          text: 'Query saved.',
          location: 'global'
        });
      });
      it('should create the right notice with the "update" saveType', () => {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_SUCCESS,
          saveType: 'update',
          id: 1
        });
        expect(NoticeStore.getGlobalNotice()).toEqual({
          type: 'success',
          icon: 'ok',
          text: 'Query updated.',
          location: 'global'
        });
      });
    });

    describe('EXPLORER_SAVE_FAIL actionType', () => {
      it('should create the right notice with the "save" saveType', () => {
        var errorMessage = 'there was an error with saving'
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_FAIL,
          saveType: 'save',
          errorMsg: errorMessage,
          id: 1
        });
        expect(NoticeStore.getGlobalNotice()).toEqual({
          type: 'error',
          icon: 'remove-sign',
          text: 'Problem saving: ' + errorMessage,
          location: 'global'
        });
      });
      it('should create the right notice with the "update" saveType', () => {
        var errorMessage = 'there was an error with updating'
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_FAIL,
          saveType: 'update',
          errorMsg: errorMessage,
          id: 1
        });
        expect(NoticeStore.getGlobalNotice()).toEqual({
          type: 'error',
          icon: 'remove-sign',
          text: 'Problem updating: ' + errorMessage,
          location: 'global'
        });
      });
    });

    describe('EXPLORER_DESTROYING actionType', () => {
      it('should create the right notice', () => {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROYING,
          id: 1
        });
        expect(NoticeStore.getGlobalNotice()).toEqual({
          type: 'info',
          text: 'Deleting query...',
          icon: 'info-sign',
          location: 'global'
        });
      });
    });

    describe('EXPLORER_DESTROY_SUCCESS actionType', () => {
      it('should create the right notice', () => {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROY_SUCCESS
        });
        expect(NoticeStore.getGlobalNotice()).toEqual({
          type: 'success',
          text: 'Query deleted.',
          icon: 'ok',
          location: 'global'
        });
      });
    });

    describe('EXPLORER_DESTROY_FAIL actionType', () => {
      it('should create the right notice', () => {
        var errorMsg = 'there was a destroy error';
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROY_FAIL,
          id: 1,
          errorMsg: errorMsg
        });
        expect(NoticeStore.getGlobalNotice()).toEqual({
          type: 'error',
          text: 'There was a problem deleting your query: ' + errorMsg,
          icon: 'remove-sign',
          location: 'global'
        });
      });
    });

    describe('EXPLORER_FOUND_INVALID actionType', () => {
      it('should create one notice for each invalid step of a funnel query', () => {
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
        expect(NoticeStore.getStepNotices()).toHaveLength(2);
        expect(NoticeStore.getStepNotices()[0]).toEqual({
          id: 'abc123',
          location: 'step',
          stepIndex: 0,
          text: 'step 1 invalid',
          type: 'error',
          icon: 'remove-sign'
        }, 'first step quality');
        expect(NoticeStore.getStepNotices()[1]).toEqual({
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
