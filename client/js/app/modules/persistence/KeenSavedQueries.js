var _ = require('lodash');
var request = require('superagent');
var ExplorerUtils = require('../../utils/ExplorerUtils');

function KeenSavedQueries(config) {
  this.config = config;
  this.actions = {
    getOne:   'GET /{id}',
    getAll:   'GET',
    create:   'PUT /{id}',
    update:   'PUT /{id}',
    destroy:  'DELETE /{id}'
  };
}

KeenSavedQueries.prototype.makeRequest = function(action, id, body, callback) {
  var actionComponents = this.actions[action].split(' ');
  var httpMethod = actionComponents[0];
  var url = this.config.baseUrl;

  if (actionComponents[1] && id) url += actionComponents[1].replace('{id}', id);
  url += '?api_key=' + this.config.masterKey;

  var r = request(httpMethod, url).type('application/json');
  if (body) {
    delete body.id;
    r.send(body);
  }
  r.end(function(err, res){
    if (err) {
      callback(JSON.parse(err.response.text).error);
      return;
    }
    callback(null, res.body);
  });
};

KeenSavedQueries.prototype.create = function(model, callback) {
  this.makeRequest('create', model.query_name, model, callback);
};

KeenSavedQueries.prototype.update = function(model, callback) {
  this.makeRequest('update', model.id, model, callback);
};

KeenSavedQueries.prototype.destroy = function(model, callback) {
  this.makeRequest('destroy', model.id, null, callback);
};

KeenSavedQueries.prototype.get = function(model, callback) {
  if (model) {
    this.makeRequest('getOne', model.id, null, callback);
  } else {
    this.makeRequest('getAll', null, null, callback);
  }
};

module.exports = KeenSavedQueries;
