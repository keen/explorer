import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';

const mapStateToProps = state => ({
  results: state.queries.results,
});

const mapDispatchToProps = {};
class JsonView extends Component {
  render() {
    return (
      <ReactJson
        src={this.props.results}
        displayDataTypes={false} />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JsonView);
