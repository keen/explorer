/**
 * @jsx React.DOM
 */
var _ = require('lodash');
var moment = require('moment');
var React = require('react/addons');

var DataTable = React.createClass({

  // ***********************
  // Convenience functions
  // ***********************
  _formatCell: function(row, header) {
    if (header === 'timeframe') {
      var startTime = new Date(row[header]['start']);
      return moment(startTime).format('MMM Do, YYYY HH:mm:ss');
    } else {
      return row[header];
    }
  },

  _generateHeader: function(headerFields) {
    return(React.DOM.tr(null,
      _.map(headerFields, function(cell) {
        return React.DOM.th(null, cell);
      }))
    );
  },

  _generateRow: function(row, index, headers) {
    var _this = this;
    var className = index % 2 == 0 ? 'even' : 'odd';
    return(React.DOM.tr({className: className},
      _.map(headers, function(header) {
        return React.DOM.td(null, _this._formatCell(row, header));
      }))
    );
  },

  // ***********************
  // Lifecycle hooks
  // ***********************
  render: function() {
    var _this = this;
    var headers = _.keys(_.first(this.props.data));
    return (
      React.DOM.table({className: 'data-table table'},
        React.DOM.thead(null, this._generateHeader(headers)),
        React.DOM.tbody(null, this.props.data.map(function(row, index) {
          return _this._generateRow(row, index, headers);
        })
      ))
    );
  }
});

module.exports = DataTable;
