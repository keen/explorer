var React = require('react');

var ApiUrl = React.createClass({

  getInitialState: function(){
    return {
      active: false
    }
  },

  handleClick: function(){
    var self = this;
    self.setState({ active: !self.state.active });
    if (!self.state.active) {
      setTimeout(function(){
        self.refs['input'].focus();
      }, 50);
    }
  },

  handleInputSelect: function(e){
    e.target.setSelectionRange(0, 9999);
  },

  handleInputChange: function(e){
    e.preventDefault();
  },

  render: function(){
    return (
      <div className="explorer-api-url">
        <button className="btn btn-link field-secondary-control" title="API URL" type="button" onClick={this.handleClick}>
          <span className={"icon glyphicon glyphicon-chevron-" + (this.state.active ? "down" : "right") + " icon-chevron-" + (this.state.active ? "down" : "right")}></span> API Query URL
        </button>
        <div className={this.state.active ? "show" : "hide"}>
          <input
            ref="input"
            name="api-query"
            className="form-control input-sm"
            placeholder="API Query URL will appear here..."
            value={this.props.isValid ? this.props.url : ""}
            onClick={this.handleInputSelect}
            onFocus={this.handleInputSelect}
            onChange={this.handleInputChange} />
        </div>
      </div>
    );
  }

});

module.exports = ApiUrl;
