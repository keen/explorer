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
var ExtractionOptions = require('./extraction_options.js');
var Timeframe = require('../../common/timeframe.js');
var Interval = require('../../common/interval.js');
var Input = require('../../common/input.js');
var ApiUrl = require('./api_url.js');
var ExplorerStore = require('../../../stores/ExplorerStore');
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

  handleRevertChanges: function(event) {
    event.preventDefault();
    ExplorerActions.revertActiveChanges();
  },

  shouldShowRevertButton: function() {
    return ExplorerUtils.isPersisted(this.props.model) && this.props.model.originalModel && this.props.model.originalModel.query && !_.isEqual(this.props.model.query, this.props.model.originalModel.query);
  },

  // React methods

  render: function() {
    var groupByField,
        targetPropertyField,
        percentileField,
        intervalField,
        extractionOptions,
        analysisType = this.props.model.query.analysis_type,
        clearButton,
        apiQueryUrl = ExplorerUtils.getApiQueryUrl(this.props.client, this.props.model);

    if (!this.shouldShowRevertButton()) {
      clearButton = (
        <button type="reset" role="clear-query"
          className="btn btn-default btn-block"
          id="clear-explorer-query"
          onClick={this.props.handleClearQuery}>
            Clear
        </button>
      );
    }
    else {
      clearButton = (
        <button
          className="btn btn-default btn-block"
          onClick={this.handleRevertChanges}
          role="revert-query">
            Revert to original
        </button>
      );
    }

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
    if (analysisType === 'extraction') {
      extractionOptions = <ExtractionOptions model={this.props.model}
                                             handleChange={this.handleChange}
                                             setExtractionType={this.props.setExtractionType} />;
    }

    return (
      <section className="query-pane-section query-builder">
        <form className="form query-builder-form" onSubmit={this.props.handleQuerySubmit}>
          <EventCollectionField ref="event-collection-field"
                                value={this.props.model.query.event_collection}
                                options={this.props.project.eventCollections}
                                handleChange={this.handleChange}
                                onBrowseEvents={this.props.onBrowseEvents} />
          <AnalysisTypeField ref="analysis-type-field"
                             value={this.props.model.query.analysis_type}
                             options={ProjectUtils.getConstant('ANALYSIS_TYPES')}
                             handleChange={this.handleChange} />
          {extractionOptions}
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
          <div className="button-set-clear-toggle">
            {clearButton}
          </div>
          <ApiUrl url={ExplorerUtils.getApiQueryUrl(this.props.client, this.props.model)} />
        </form>
      </section>
    );
  }
});

module.exports = QueryBuilder;
