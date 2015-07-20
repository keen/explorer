/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
var classNames = require('classnames');
var Input = require('../../common/input.js');
var Modal = require('../../common/modal.js');

var AddFavoriteModal = React.createClass({

  onSave: function(event) {
    event.preventDefault();
    if (this.canSave()) {
      this.setState({ name: '' });
      this.props.saveCallback();
    }
  },

  canSave: function() {
    if (this.state.name) {
      return true;
    }
    return false;
  },

  nameChange: function(event) {
    this.setState({ name: event.target.value });
  },

  getInitialState: function() {
    return { name: '' };
  },

  render: function() {
    var btnClasses = classNames({
      'btn btn-primary pull-left no-radius-left': true,
      'disabled': !this.canSave()
    });

    return (
      <div>
        <Modal ref="modal"
               title="New Favorite"
               titleIcon="heart"
               iconClasses="fav-icon">
          <div className="fav-form">
            <form onSubmit={this.onSave}>
              <Input classes=""
                     inputClasses="pull-left no-radius-right"
                     name="name"
                     ref="name"
                     placeholder="Favorite name..."
                     value={this.state.name}
                     onChange={this.nameChange} />
            </form>
            <button className={btnClasses} onClick={this.onSave}>
              <span className="icon glyphicon glyphicon-plus margin-right-tiny"></span>
              Add
            </button>
          </div>
        </Modal>
      </div>
    );
  }
});

module.exports = AddFavoriteModal;