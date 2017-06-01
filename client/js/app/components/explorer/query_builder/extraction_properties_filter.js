var React = require('react');
var ReactMultiSelect = require('../../common/react_multi_select.js');
var ExplorerActions = require('../../../actions/ExplorerActions');

var ExtractionPropertiesFilter = React.createClass({

  _getKeys: function() {
    var keys = _.keys(this.props.result);
    var keyList = _.map(keys, function(key) {
      if (typeof this.props.result[key] === "object") {
        return this._getKey(key, this.props.result[key]);
      }

      return key;
    }.bind(this));

    return _.flatten(keyList);
  },

  _getKey: function(prevKey, obj) {
    var keys = _.keys(obj);

    return _.map(keys, function(key) {
      var keyStr = prevKey + '.' + key;
      if (typeof obj[key] === 'object') {
        return this._getKey(keyStr, obj[key]);
      }

      return keyStr;
    }.bind(this));
  },

  render: function() {
    return (<ReactMultiSelect
      name="filter-properties"
      model={this.props.model}
      label="Filter extraction properties"
      handleChange={ExplorerActions.changeExtractionFields}
      items={this._getKeys()}
    />);
  }

});

module.exports = ExtractionPropertiesFilter;
