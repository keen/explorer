/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');

var QueryActions = React.createClass({

  render: function() {
    return (
      <div className="query-actions clearfix">
        <div className="row">
          <div className="col-md-10 clearfix">
            <div className="run-group margin-right-tiny pull-left">
              <button type="submit" className="btn btn-primary margin-right-tiny">
                Run Query
              </button>
              <button type="reset" className="btn btn-default margin-right-tiny">
                Clear
              </button>
            </div>
            <div className="manage-group pull-left">
              <button type="button" className="btn btn-success save-query margin-right-tiny">
                Save
              </button>
              <button type="button" className="btn btn-default">
                Delete
              </button>
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-default code-sample-toggle pull-right">
              <span>&lt;/&gt; Embed</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = QueryActions;
