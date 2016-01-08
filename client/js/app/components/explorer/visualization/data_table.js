/**
 * @jsx React.DOM
 */
var _ = require('lodash');
var React = require('react');
var Loader = require('../../common/loader.js');

var DataTable = React.createClass({

  _generateHeader: function(dataset) {
    var cells = _.map(dataset.selectRow(0), function(key) {
      return <th>{key}</th>;
    });
    return <tr>{cells}</tr>;
  },

  _generateRows: function(dataset) {
    return _.map(dataset.output().slice(1), function(row, index) {
      var className = index % 2 == 0 ? 'even' : 'odd';
      var cells = _.map(row, function(cell){
        var value = ('undefined' !== typeof cell) ? String(cell) : '';
        return <td>{value}</td>;
      });
      return <tr className={className}>{cells}</tr>;
    });
  },

  // ***********************
  // Lifecycle hooks
  // ***********************
  render: function() {
    var dataset, headerRows, tableRows;

    this.props.dataviz.data(this.props.model.response);
    dataset = this.props.dataviz.dataset;

    // TODO: Fix unit tests to handle proper instantiation
    if ('undefined' !== typeof dataset) {
      dataset.insertColumn(0, '#', function(row, i){
        return i;
      });
      dataset.sortColumns('asc');
      headerRows = this._generateHeader(dataset);
      tableRows = this._generateRows(dataset);
    }

    return (
      <table className='data-table table'>
        <thead>{headerRows}</thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }
});

module.exports = DataTable;
