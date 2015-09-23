/**
 * @jsx React.DOM
 */

var React = require('react');
var ExplorerUtils = require('../../../utils/ExplorerUtils');

var ExtractionOptions = React.createClass({

  render: function(){
    return (
      <div className="extraction-options">
        <div className="row">
          <div className="col-md-6">
            <div className="radio">
              <label>
                <input type="radio" name="extraction_type" value="immediate" onChange={this.props.setExtractionType} checked={!ExplorerUtils.isEmailExtraction(this.props.model)}/> Preview lastest {ExplorerUtils.EXRACTION_EVENT_LIMIT} events now
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="radio">
              <label>
                <input type="radio" name="extraction_type" value="email" onChange={this.props.setExtractionType} checked={ExplorerUtils.isEmailExtraction(this.props.model)}/> Bulk CSV extration by email
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ExtractionOptions;
