var React = require('react');
var ReactMultiSelect = require('../../common/react_multi_select.js');
var ExplorerActions = require('../../../actions/ExplorerActions');

var ExtractionPropertiesFilter = React.createClass({

  _getKeys: function() {
    var keys = _.keys(this.props.result);
    var keyList = _.map(keys, function(key) {
      if (typeof this.props.result[key] === "object") {
        var subKeys = _.keys(this.props.result[key]);
        return _.map(subKeys, function(subKey) {
          return key + '.' + subKey;
        });
      }

      return key;
    }.bind(this));

    return _.flatten(keyList);
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
