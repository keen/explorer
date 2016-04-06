var React = require('react');
var _ = require('lodash');
var classNames = require('classnames');

var Modal = React.createClass({

  closeClick: function(event) {
    event.preventDefault();
    this.close();
  },

  backdropClick: function(event) {
    if (!$(event.target).closest('.modal-dialog').length) {
      this.close();
    }
  },

  close: function(){
    if (this.state.open) {
      this.removeBackdrop();
      this.setState({ open: false });
      this.props.onClose();
    }
  },

  open: function() {
    if (!this.state.open) {
      this.addBackdrop();
      this.setState({ open: true });
      this.props.onOpen();
    }
  },

  setLoading: function(value) {
    if (typeof value === "boolean") {
      this.setState({ loading: value });
    }
  },

  addBackdrop: function() {
    $('body').addClass('modal-open');

    var backdropEl = document.createElement('div');
    backdropEl.id = 'modal-backdrop';
    backdropEl.className = 'modal-backdrop in';
    document.body.appendChild(backdropEl);
  },

  removeBackdrop: function(){
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  },

  buildFooter: function() {
    if (this.props.footerBtns.length) {
      var footerBtns = _.map(this.props.footerBtns, _.bind(function(btnConfig, index){
        var text = btnConfig.text;

        var classes = 'btn';
        if (btnConfig.classes) {
          classes = classes + ' ' + btnConfig.classes;
        } else {
          classes = classes + ' btn-default';
        }

        var icon;
        if (btnConfig.iconName) {
          var iconClass = 'icon glyphicon glyphicon-' + btnConfig.iconName;
          var icon = (<span className={iconClass}></span>);
        }

        return (
          <button type="button" ref={btnConfig.ref || ''} className={classes} onClick={btnConfig.onClick || this.close} key={index}>
            {icon}
            {text}
          </button>
        );
      }, this));

      return (
        <div className="modal-footer">
          {footerBtns}
        </div>
      );
    }
  },

  // Lifecycle hooks

  getInitialState: function() {
    return {
      open: false,
      loading: false
    };
  },

  getDefaultProps: function() {
    return {
      size: 'small',
      modalClasses: '',
      footerBtns: [],
      onOpen: function(){},
      onClose: function(){}
    };
  },

  componentDidMount: function() {
    $(document).on('click', '.modal.block', _.bind(this.backdropClick, this));
    $(document).on('keyup', _.bind(function(e) {
      // Escapism?
      if (e.keyCode === 27 && e.target.className.indexOf('react-select-input') < 0) {
        this.close();
      }
    }, this));
  },

  componentWillUnmount: function() {
    $(document).off('click', '.modal-backdrop');
  },

  render: function() {
    var modalClasses = this.props.modalClasses + ' modal';
    if (this.state.open) {
      modalClasses += ' block';
    }
    var modalDialogClasses = classNames({
      'modal-dialog': true,
      'modal-lg': this.props.size === 'large'
    });

    var titleIcon;
    if (this.props.titleIcon) {
      var titleIconClasses = "icon glyphicon glyphicon-" + this.props.titleIcon;
      if (!this.props.title) titleIconClasses += " big no-margin";
      if (this.props.iconClasses) titleIconClasses = titleIconClasses + " " + this.props.iconClasses;
      titleIcon = <span className={titleIconClasses}></span>
    }

    return (
      <div className={modalClasses}>
        <div className={modalDialogClasses}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeClick}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h3 className="modal-title">
                {titleIcon}
                {this.props.title}
              </h3>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            {this.buildFooter()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
