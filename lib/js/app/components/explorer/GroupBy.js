import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    collections: state.collections,
    ui: state.ui
  }
};

const mapDispatchToProps = { updateUI };

class GroupBy extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedGroupBy: [],
      loading: false
    };
  }

  componentDidMount(){
    this.onChange();
  }

  getCurrentSchema(){
    if (!this.props.collections || !this.props.collections.schema) {
      return [];
    }
    return Object.keys(this.props.collections.schema);
  }

  onChange(){
    const {
      selectedGroupBy
    } = this.state;

    if (selectedGroupBy.length) {
      const groupBy = [selectedGroupBy[0].value]
      this.props.onChange(groupBy);
    }
  }

  renderSelects(){
    const { activeTab } = this.state;
    const { schemaProperties, ui } = this.props;
    const { eventCollection, groupBy, numberOfGroupByProps } = ui;

    const groupByValue = groupBy ? groupBy[0] : '';
    const groupByValue2 = groupByValue ? groupBy[1] : '';
    const elementsToRender = [];

    elementsToRender.push(<Select
        key='groupBySelect1'
        value={{
          label: groupByValue,
          value: groupByValue
        }}
        options={this.getCurrentSchema().map(item => ({ label: item, value: item }) )}
        onChange={ (value) => {
          this.props.updateUI({
            groupBy: [ value.value ]
          });
        }}
        className='standardUnits'
      />);

    if (numberOfGroupByProps === 2) {
      elementsToRender.push(<Select
          key='groupBySelect2'
          value={{
            label: groupByValue2,
            value: groupByValue2
          }}
          options={this.getCurrentSchema().map(item => ({ label: item, value: item }) )}
          onChange={ (value) => {
            this.props.updateUI({
              groupBy: [ groupBy[0], value.value ]
            });
          }}
          className='standardUnits'
        />);
    }

    return elementsToRender;
  }

  renderButton(){
    const { ui } = this.props;
    const { numberOfGroupByProps } = ui;

    if (numberOfGroupByProps === 1) {
      return <div
        className=''
        onClick={() => {
        this.props.updateUI({
          numberOfGroupByProps: 2
        });
      }}>Add second property</div>;
    }

    return <div
      className=''
      onClick={() => {
      this.props.updateUI({
        numberOfGroupByProps: 1
      });
    }}>Remove second property</div>;
  }

  render(){
    const { activeTab } = this.state;
    const { schemaProperties, ui } = this.props;
    const { eventCollection } = ui;

    return (
      <div className='groupBy'>
          <div className='tabContent'>
          <div className='tab'>
            {
              !eventCollection &&
              <div>Choose the Event Collection</div>
            }
            {
              eventCollection &&
              <div>
               { this.renderSelects() }
               { this.renderButton() }
              </div>
            }
          </div>
          </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupBy);
