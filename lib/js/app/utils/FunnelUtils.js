import _ from 'lodash';
import FormatUtils from './FormatUtils';
import FilterUtils from './FilterUtils';
import TimeframeUtils from './TimeframeUtils';

const STEP_PARAMS = [
  'event_collection',
  'actor_property',
  'timeframe',
  'interval',
  'timezone',
  'filters',
  'optional',
  'inverted',
  'with_actors'
];
export default {

  stepJSON: function (step) {
    var params = _.cloneDeep(step);

    _.assign(params, TimeframeUtils.getTimeParameters(step.time, step.timezone));

    if (params.filters) {
      params.filters = _.map(params.filters, function(filter) {
        return FilterUtils.queryJSON(filter, TimeframeUtils.getTimezoneOffset(params.timezone));
      });

      _.remove(params.filters, _.isEmpty);
    }

    // Remove empty, null, or unnecessary properties
    _.each(params, function(value, key) {
      if (!FormatUtils.isValidQueryValue(value) || !_.includes(STEP_PARAMS, key)) {
        delete params[key];
      }
    });

    return params;
  },

  formatQueryParams: function (step) {
    if (step.timeframe) {
      var unpackedTime = TimeframeUtils.unpackTimeframeParam(step.timeframe, step.timezone);
      step.time = unpackedTime.time;
      step.timezone = unpackedTime.timezone;
    }

    if (step.filters) {
      step.filters = _.compact(_.map(step.filters, FilterUtils.formatFilterParams));
    }

    step.inverted = (step.inverted === true || step.inverted === "true");
    step.optional = (step.optional === true || step.optional === "true");
    step.with_actors = (step.with_actors === true || step.with_actors === "true");

    return step;
  }

};
