/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
var Input = require('./input.js');
var Select = require('./select.js');

var RELATIVE_TIMEFRAMES = ['this', 'previous'];

var ExplorerUtils = require('../../utils/ExplorerUtils');
var ExplorerActions = require('../../actions/ExplorerActions');
var FormatUtils = require('../../utils/FormatUtils');

function hasRelativeTimeframe(explorer) {
  var time = explorer.query.time || {};
  return time.relativity && time.amount && time.sub_timeframe;
}

var RelativePicker = React.createClass({

  setRelativeTime: function(event) {
    var name = event.target.name;
    var value = event.target.value;

    var updates = _.cloneDeep(this.props.model);
    updates.query.time[name] = value;
    ExplorerActions.update(this.props.model.id, updates);
  },

  buildDescriptionCopy: function() {
    var time = this.props.model.query.time;

    if (hasRelativeTimeframe(this.props.model)) {
      var subIntervalCopy = FormatUtils.singularize(time.sub_timeframe, time.amount);
      var timeAmountPluralSuffix = time.amount > 1 ? 's' : '';
      var relativityCopy = time.relativity == 'this' ? 'including' : 'excluding';
      var singularCurrentInterval = FormatUtils.singularize(subIntervalCopy);

      return (<p className="help-block">The last {time.amount} {subIntervalCopy}{timeAmountPluralSuffix} <b>{relativityCopy}</b> the current {singularCurrentInterval}.</p>);
    }
  },

  // React Methods

  render: function() {
    var descriptionCopy = this.buildDescriptionCopy();

    return (
      <div className="relative-timeframe-picker">
        <div className="row">
          <div className="col-xs-4 form-collapse-right" id="relative-type">
            <div clasName="btn-group">
              <Select label={false}
                      name="relativity"
                      classes="relativity"
                      options={RELATIVE_TIMEFRAMES}
                      emptyOption={false}
                      handleSelection={this.setRelativeTime}
                      selectedOption={this.props.model.query.time.relativity} />
            </div>
          </div>
          <div className="col-xs-3 form-collapse-left form-collapse-right" id="interval-amount">
            <Input label={false}
                   name="amount"
                   classes="amount"
                   onChange={this.setRelativeTime}
                   placeholder="e.g. 1"
                   value={this.props.model.query.time.amount || ""} />
          </div>
          <div className="col-xs-5 form-collapse-left" id="sub-interval-type">
            <Select label={false}
                    name="sub_timeframe"
                    classes="sub-timeframe"
                    options={this.props.relativeIntervalTypes}
                    emptyOption={false}
                    handleSelection={this.setRelativeTime}
                    selectedOption={this.props.model.query.time.sub_timeframe}
                    sort={false} />
          </div>
        </div>
        {descriptionCopy}
      </div>
    );
  }
});

module.exports = RelativePicker;
