import _ from 'lodash';
import ExplorerUtils from '../../utils/ExplorerUtils';

function KeenSavedQueries(config) {
  this.config = config;
}

KeenSavedQueries.prototype.create = function(model, callback) {
  var body = _.omit(model, ['id']);
  this.config.client
    .put({
      url: this.config.client.url('queries', 'saved', model.query_name),
      api_key: this.config.client.masterKey(),
      params: body
    })
    .then(function(res){
      callback(null, res);
    })
    .catch(callback);
};

KeenSavedQueries.prototype.update = function(model, callback) {
  var body = _.omit(model, ['id']);
  this.config.client
    .put({
      url: this.config.client.url('queries', 'saved', model.id),
      api_key: this.config.client.masterKey(),
      params: body
    })
    .then(function(res){
      callback(null, res);
    })
    .catch(callback);
};

KeenSavedQueries.prototype.destroy = function(model, callback) {
  this.config.client
    .del({
      url: this.config.client.url('queries', 'saved', model.id),
      api_key: this.config.client.masterKey()
    })
    .then(function(res){
      callback(null, res);
    })
    .catch(function(err){
      if (err.status === 204) {
        callback(null, undefined);
      }
      else {
        callback(err, null);
      }
    });
};

KeenSavedQueries.prototype.get = function(model, callback) {
  if (model) {
    this.config.client
      .get({
        url: this.config.client.url('queries', 'saved', model.id),
        api_key: this.config.client.masterKey()
      })
      .then(function(res){
        callback(null, res);
      })
      .catch(callback);
  } else {
    this.config.client
      .get({
        url: this.config.client.url('queries', 'saved'),
        api_key: this.config.client.masterKey()
      })
      .then(function(res){
        callback(null, res);
      })
      .catch(callback);
  }
};

export default KeenSavedQueries;
