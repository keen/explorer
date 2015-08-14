/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react/addons');

// Components
var FieldsToggle = require('../../common/fields_toggle.js');
var EventCollectionField = require('./event_collection_field.js');
var AnalysisTypeField = require('./analysis_type_field.js');
var TargetPropertyField = require('./target_property_field.js');
var PercentileField = require('./percentile_field.js');
var GroupByField = require('./group_by_field.js');
var Timeframe = require('../../common/timeframe.js');
var Interval = require('../../common/interval.js');
var ApiUrl = require('./api_url.js');
var RunQuery = require('../../common/run_query.js');
var ExplorerUtils = require('../../../utils/ExplorerUtils');
var ProjectUtils = require('../../../utils/ProjectUtils');
var ExplorerActions = require('../../../actions/ExplorerActions');
var runValidations = require('../../../utils/ValidationUtils').runValidations;
var FilterValidations = require('../../../validations/FilterValidations');

function validFilters(filters) {
  return _.filter(filters, function(filter) {
    return runValidations(FilterValidations.filter, filter).isValid;
  });
}

var QueryBuilder = React.createClass({

  clearQuery: function() {
    ExplorerActions.clear(this.props.model.id);
  },

  handleQuerySubmit: function(event) {
    event.preventDefault();
    ExplorerActions.exec(this.props.client, this.props.model.id);
    $('html,body').animate({ scrollTop: 0}, 300);
  },

  // Event callbacks

  handleSelectionWithEvent: function(event) {
    this.handleChange(event.target.name, event.target.value);
  },

  handleChange: function(name, value) {
    if (_.isArray(value)) {
      value = _.compact(value);
    }

    var updates = _.cloneDeep(this.props.model);
    updates.query[name] = value;
    ExplorerActions.update(this.props.model.id, updates);
  },

  // Convenience Methods

  getEventPropertyNames: function()  {
    return ProjectUtils.getEventCollectionPropertyNames(this.props.project, this.props.model.query.event_collection);
  },

  updateGroupBy: function(updates) {
    ExplorerActions.update(this.props.model.id, {
      query: _.assign(_.cloneDeep(this.props.model.query), updates)
    });
  },

  // React methods

  render: function() {
    var groupByField;
    var targetPropertyField;
    var percentileField;
    var intervalField;
    var analysisType = this.props.model.query.analysis_type;
    var apiQueryUrl = ExplorerUtils.getApiQueryUrl(this.props.client, this.props.model);

    if (analysisType !== 'extraction') {
      groupByField = <GroupByField ref="group-by-field"
                                   value={this.props.model.query.group_by}
                                   updateGroupBy={this.updateGroupBy}
                                   options={this.getEventPropertyNames()}
                                   handleChange={this.handleChange} />
      intervalField = <Interval model={this.props.model} />;
    }
    if (analysisType && analysisType !== 'count' && analysisType !== 'extraction') {
      targetPropertyField = <TargetPropertyField ref="target-property-field"
                                                 value={this.props.model.query.target_property}
                                                 options={this.getEventPropertyNames()}
                                                 handleChange={this.handleChange} />;
    }
    if (analysisType === 'percentile') {
      percentileField = <PercentileField ref="percentile-field"
                                         value={this.props.model.query.percentile}
                                         onChange={this.handleSelectionWithEvent} />;
    }

    return (
      <section className="query-pane-section query-builder">
        <form className="form query-builder-form" onSubmit={this.handleQuerySubmit}>
          <EventCollectionField ref="event-collection-field"
                                value={this.props.model.query.event_collection}
                                options={this.props.project.eventCollections}
                                handleChange={this.handleChange}
                                onBrowseEvents={this.props.onBrowseEvents} />
          <AnalysisTypeField ref="analysis-type-field"
                             value={this.props.model.query.analysis_type}
                             options={ProjectUtils.getConstant('ANALYSIS_TYPES')}
                             handleChange={this.handleChange} />
          {targetPropertyField}
          {percentileField}
          <Timeframe ref="timeframe"
                     model={this.props.model}
                     project={this.props.project} />
          <hr className="fieldset-divider" />
          {groupByField}
          <div className="field-component">
            <FieldsToggle ref="filters-fields-toggle"
                          name="Filters"
                          model={this.props.model}
                          toggleCallback={this.props.handleFiltersToggle}
                          fieldsCount={validFilters(this.props.model.query.filters).length} />
          </div>
          {intervalField}
          <RunQuery classes="pull-right"
                    clearQuery={this.clearQuery}
                    model={this.props.model}
                    handleQuerySubmit={this.handleQuerySubmit} />
          <ApiUrl url={ExplorerUtils.getApiQueryUrl(this.props.client, this.props.model)} />
        </form>
      </section>
    );
  }
});

module.exports = QueryBuilder;
