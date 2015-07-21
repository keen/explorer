/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');
var classNames = require('classnames');
var Input = require('../common/input.js');
var Modal = require('../common/modal.js');
var ExplorerActions = require('../../actions/ExplorerActions');

var CSVExtraction = React.createClass({

  // *********************
  // Callbacks
  // *********************

  handleSelection: function(event) {
    var updates = { query: _.cloneDeep(this.props.model.query) };
    updates.query[event.target.name] = event.target.value;
    ExplorerActions.update(this.props.model.id, updates);
  },

  sendEmailExtraction: function() {
    this.setState({ 
      loading: true,
      error: false,
      successful: false
    });
    ExplorerActions.runEmailExtraction(this.props.client, this.props.model.id, _.bind(this.extractionComplete, this));
  },

  extractionComplete: function(resp) {
    if (resp.success) {
      this.setState({
        loading: false,
        error: false,
        successful: true
      });
    } else {
      this.setState({
        loading: false,
        error: resp.error,
        successful: false
      });
    }
  },

  // *********************
  // Convenience Functions
  // *********************

  buildCompletionMsg: function() {
    if (!this.state.loading && !this.state.error && !this.state.successful) return;

    var msg;
    if (this.state.loading) {
      msg = "Requesting email extraction..."
    } else if (this.state.error) {
      msg = this.state.error;
    } else if (this.state.successful) {
      var msg = "Great, we're now building your extraction. You should receive an email shortly.";
    }
    var alertClasses = classNames({
      'alert-info': this.state.loading,
      'alert-danger': this.state.error,
      'alert-success': this.state.successful,
      'alert': true
    });
    return (<div className={alertClasses}>{msg}</div>);
  },

  // ***************
  // Lifecycle Hooks
  // ***************

  getInitialState: function() {
    return {
      loading: false,
      error: false,
      successful: false
    };
  },

  render: function() {
    return (
      <Modal ref="modal"
             title="Receive a CSV extraction by email"
             modalClasses="email-csv-extraction"
             footerBtns={[
              { text: 'Close' },
              {
                text: this.state.loading ? 'Sending...' : 'Send',
                ref: 'modal-submit',
                classes: 'send-email-extraction btn-primary',
                iconName: 'check',
                onClick: this.sendEmailExtraction
              }
             ]}>
          {this.buildCompletionMsg()}
          <Input name="email"
                 label="Email Address"
                 ref="email"
                 placeholder="your@email.com"
                 required="true"
                 onChange={this.handleSelection}
                 onBlur={this.handleSelection}
                 value={this.props.model.query.email || ""} />
          <hr />
          <Input name="latest"
                 label="Limit number of events to extract"
                 ref="latest"
                 placeholder="E.g: 1000"
                 onChange={this.handleSelection}
                 onBlur={this.handleSelection}
                 value={this.props.model.query.latest} />
          <p className="alert no-padding no-margin subdued">
            <span className="icon glyphicon glyphicon-info-sign"></span>
            <span>{'Email extractions are limited to 10 million events.'}</span>
          </p>
      </Modal>
    );
  }
});

module.exports = CSVExtraction;
