var _ = require('lodash');
var Qs = require('qs');
var ExplorerUtils = require('../utils/ExplorerUtils');
var TimeframeUtils = require('../utils/TimeframeUtils');

function ApiQueryUrl(client, explorer) {
  this.client = client;
  this.explorer = explorer;
}

ApiQueryUrl.prototype.getUrl = function() {
  var endpoint = this.client.config.protocol + "://" + this.client.config.host;
  var projectId = this.client.config.projectId;
  var masterKey = this.client.config.masterKey;

  var attrs = ExplorerUtils.queryJSON(this.explorer);

  var analysisType = attrs.analysis_type;
  delete attrs['analysis_type'];

  var timeframe = _.cloneDeep(attrs['timeframe']);

  var filters = _.map(attrs['filters'], function(filter) {
    return _.omit(_.cloneDeep(filter), 'coercion_type');
  });
  delete attrs['filters'];

  var steps;
  if (attrs['steps']) {
    steps = this._encodeAttribute(attrs['steps']);
    delete attrs['steps'];
  }

  if (attrs.group_by && _.isArray(attrs.group_by) && attrs.group_by.length) {
    attrs.group_by = (attrs.group_by.length > 1) ? JSON.stringify(attrs.group_by) : attrs.group_by[0];
  }

  var queryAttrs = Qs.stringify(attrs);

  if (attrs.timeframe && TimeframeUtils.timeframeType(this.explorer.query.time) === 'absolute') {
    delete attrs['timeframe'];
    // This is an absolute timeframe, so we need to encode the object in a specific way before sending it, as per keen docs => https://keen.io/docs/data-analysis/timeframe/#absolute-timeframes
    timeframe = this._encodeAttribute(timeframe);
    queryAttrs += '&timeframe='+ timeframe;
  }

  // We need to encode the filters the same way as we encode the absolute timeframe.
  if (filters) {
    filters = this._encodeAttribute(filters);
    queryAttrs += '&filters='+ filters;
  }

  if(steps) {
    queryAttrs += '&steps=' + steps;
  }

  var url = endpoint + '/projects/'+projectId+'/queries/'
    + analysisType
    + '?api_key='
    + this.client.readKey()
    + '&'
    + queryAttrs;
  return url;
}

ApiQueryUrl.prototype._encodeAttribute = function(attr) {
  return encodeURIComponent(JSON.stringify(attr));
}


module.exports = ApiQueryUrl;
