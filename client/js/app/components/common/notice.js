var React = require('react');
var _ = require('lodash');

function noticeExists(notice) {
  return notice && !_.isEmpty(notice);
}

var NoticeComponent = React.createClass({

  close: function(event) {
    event.preventDefault();
    this.setState({ open: false });
    this.props.closeCallback();
  },

  getDefaultProps: function() {
    return {
      notice: {},
      closeCallback: function(){},
      closable: true
    };
  },

  getInitialState: function() {
    return {
      open: noticeExists(this.props.notice)
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ open: noticeExists(nextProps.notice) });
  },

  render: function() {
    var classes = 'notice-component alert';
    if (!this.state.open) {
      classes += ' hide';
    }
    if (this.props.notice.type) {
      var type = this.props.notice.type;
      if (type === 'error') type = 'danger';
      classes += ' alert-' + type;
    } else {
      classes += ' alert-info';
    }

    var icon;
    if (this.props.notice.icon) {
      icon = <span className={"icon glyphicon glyphicon-" + this.props.notice.icon}></span>
    }

    var closeBtn;
    if (this.props.closable) {
      closeBtn = <button className="close" onClick={this.close}>&times;</button>;
    }

    return (
      <div className={classes} key="notice" ref="notice">
        {closeBtn}
        <p>{icon} <strong>{this.props.notice.text || ''}</strong></p>
      </div>
    );
  }

});

module.exports = NoticeComponent;
