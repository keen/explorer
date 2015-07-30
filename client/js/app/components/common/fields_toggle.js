/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');

var FieldsToggle = React.createClass({

  handleFieldsToggle: function(toggledState) {
    var attrNames = this.props.attrsToStore;
    var updates = {};

    if (!_.isArray(attrNames)) {
      attrNames = [attrNames];
    }
    _.each(attrNames, function(attrName){
      if (toggledState) {
        if (this._storedAttrs[attrName]) {
          updates[attrName] = this._storedAttrs[attrName];
        }
      } else {
        this._storedAttrs[attrName] = this.props.getFn(attrName);
        var resetVal = this.props.resetValues[attrName] || null;
        updates[attrName] = resetVal;
      }
    }, this);

    this.props.updateFn(updates);
  },

  toggleButtonClick: function(event) {
    event.preventDefault();
    this.toggle();
  },

  toggle: function() {
    var openState;
    if (this.props.fieldsCount === null) {
      openState = !this.state.open;
      this.setState({ open: openState });
      this.handleFieldsToggle(openState);
    }
    this.props.toggleCallback(openState || null);
  },

  // React Methods

  componentWillMount: function() {
    this._storedAttrs = {};
  },

  getDefaultProps: function() {
    return {
      toggleCallback: function(){},
      initialOpenState: false,
      fieldsCount: null,
      resetValues: {}
    };
  },

  getInitialState: function(){
    return {
      open: this.props.initialOpenState ? true : false
    };
  },

  render: function() {
    var fieldsCount = this.props.fieldsCount ? this.props.fieldsCount : null;

    var classes = classNames({
      'has-fields-count': fieldsCount,
      'open': this.state.open && fieldsCount === null,
      'fields-toggle': true
    });

    var bodyContent;
    if (this.props.children) {
      bodyContent = (
        <div className="toggle-body">
          {this.props.children}
        </div>
      );
    }

    return (
      <div className={classes}>
        <a href="#" className="toggle-label" onClick={this.toggleButtonClick} ref="toggle-label">
          <h5 ref="name">{this.props.name}</h5>
          <button type="button" className="toggle-button">
            <span className="icon" ref="icon">{fieldsCount}</span>
          </button>
        </a>
        {bodyContent}
      </div>
    );
  }

});

module.exports = FieldsToggle;
