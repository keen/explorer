var _ = require('lodash');
var ExplorerUtils = require('../../utils/ExplorerUtils');

function KeenSavedQueries(config) {
  this.config = config;
}

KeenSavedQueries.prototype.create = function(model, callback) {
  var body = _.omit(model, ['id']);
  this.config.client
    .put(this.config.client.url('queries', 'saved', model.query_name))
    .auth(this.config.client.masterKey())
    .send(body)
    .then(function(res){
      callback(null, res);
    })
    .catch(callback);
};

KeenSavedQueries.prototype.update = function(model, callback) {
  var body = _.omit(model, ['id']);
  this.config.client
    .put(this.config.client.url('queries', 'saved', model.id))
    .auth(this.config.client.masterKey())
    .send(body)
    .then(function(res){
      callback(null, res);
    })
    .catch(callback);
};

KeenSavedQueries.prototype.destroy = function(model, callback) {
  this.config.client
    .del(this.config.client.url('queries', 'saved', model.id))
    .auth(this.config.client.masterKey())
    .send()
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
      .get(this.config.client.url('queries', 'saved', model.id))
      .auth(this.config.client.masterKey())
      .send()
      .then(function(res){
        callback(null, res);
      })
      .catch(callback);
  } else {
    this.config.client
      .get(this.config.client.url('queries', 'saved'))
      .auth(this.config.client.masterKey())
      .send()
      .then(function(res){
        callback(null, res);
      })
      .catch(callback);
  }
};

module.exports = KeenSavedQueries;
