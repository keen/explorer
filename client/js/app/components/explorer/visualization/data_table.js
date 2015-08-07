/**
 * @jsx React.DOM
 */
var _ = require('lodash');
var moment = require('moment');
var React = require('react/addons');
var Loader = require('../../common/loader.js');

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
    var cells = _.map(headerFields, function(cell) {
      return <th>{cell}</th>;
    });
    return <tr>{cells}</tr>;
  },

  _generateRows: function(data, headers) {
    var _this = this;
    var cells;
    return _.map(data, function(row, index) {
      var className = index % 2 == 0 ? 'even' : 'odd';

      if (_.isArray(row) || _.isObject(row)) {
        cells = _.map(headers, function(header) {
          return <td>{_this._formatCell(row, header)}</td>;
        });
      } else {
        cells = <td>{row}</td>;
      }

      return <tr className={className}>{cells}</tr>;
    });
  },

  // ***********************
  // Lifecycle hooks
  // ***********************
  render: function() {
    var _this = this;
    var headers = _.keys(_.first(this.props.data));
    var headerRows = this._generateHeader(headers);
    var tableRows = this._generateRows(this.props.data, headers);
    return (
      <table className='data-table table'>
        <thead>{headerRows}</thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }
});

module.exports = DataTable;
