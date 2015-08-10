var _ = require('lodash');
var request = require('superagent');

function RESTPersistence(config) {
  this.config = config;
  this.actions = {
    getOne:   'GET /{id}',
    getAll:   'GET',
    create:   'POST',
    update:   'PUT /{id}',
    destroy:  'DELETE /{id}'
  };
}

RESTPersistence.prototype.makeRequest = function(action, id, body, callback) {
  var actionComponents = this.actions[action].split(' ');
  var httpMethod = actionComponents[0];
  var url = this.config.baseUrl;
  if (body) delete body.id
    
  if (actionComponents[1] && id) {
    url = url + actionComponents[1].replace('{id}', id);
  }
  var r = request(httpMethod, url).type('application/json')
  if (body) {
    r.send(body);
  }
  r.end(function(err, res){
    if (err) {
      callback(err);
      return;
    }
    var body = res ? res.body : null;
    if (body.result) body = body.result;
    callback(null, body);
  });
};

RESTPersistence.prototype.create = function(model, callback) {
  this.makeRequest('create', null, model, callback);
};

RESTPersistence.prototype.update = function(model, callback) {
  this.makeRequest('update', model.id, model, callback);
};

RESTPersistence.prototype.destroy = function(modelId, callback) {
  this.makeRequest('destroy', modelId, null, callback);
};

RESTPersistence.prototype.get = function(modelId, callback) {
  if (modelId) {
    this.makeRequest('getOne', modelId, null, callback);
  } else {
    this.makeRequest('getAll', null, null, callback);
  }
};

module.exports = RESTPersistence;
