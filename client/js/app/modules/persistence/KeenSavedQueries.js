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
  if (body) delete body.id;

  if (actionComponents[1] && id) {
    url = url + actionComponents[1].replace('{id}', id);
  }
  if (this.config.masterKey) {
    url += '?api_key=' + this.config.masterKey;
  }
  var r = request(httpMethod, url).type('application/json');
  if (body) {
    r.send(body);
  }
  r.end(function(err, res){
    if (err) {
      callback(JSON.parse(err.response.text).error);
      return;
    }
    var callbackBody = res ? res.body : null;
    if (callbackBody.result) {
      callbackBody = callbackBody.result;
    }
    callback(null, callbackBody);
  });
};

KeenSavedQueries.prototype.create = function(model, callback) {
  this.makeRequest('create', ExplorerUtils.slugify(model.query_name), model, callback);
};

KeenSavedQueries.prototype.update = function(model, callback) {
  this.makeRequest('update', ExplorerUtils.slugify(model.query_name), model, callback);
};

KeenSavedQueries.prototype.destroy = function(model, callback) {
  this.makeRequest('destroy', ExplorerUtils.slugify(model.query_name), null, callback);
};

KeenSavedQueries.prototype.get = function(model, callback) {
  if (model) {
    this.makeRequest('getOne', ExplorerUtils.slugify(model.query_name), null, callback);
  } else {
    this.makeRequest('getAll', null, null, callback);
  }
};

module.exports = KeenSavedQueries;
