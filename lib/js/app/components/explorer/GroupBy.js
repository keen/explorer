import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = state => (
  {
    collections: state.collections,
    ui: state.ui,
  }
);

const mapDispatchToProps = { updateUI };

class GroupBy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGroupBy: [],
    };
  }

  componentDidMount() {
    this.onChange();
  }

  onChange() {
    const {
      selectedGroupBy,
    } = this.state;

    if (selectedGroupBy.length) {
      const groupBy = [selectedGroupBy[0].value]
      this.props.onChange(groupBy);
    }
  }

  getCurrentSchema() {
    if (!this.props.collections || !this.props.collections.schema) {
      return [];
    }
    return Object.keys(this.props.collections.schema);
  }

  renderSelects() {
    const { ui } = this.props;
    const {
      groupBy,
      orderBy,
      limit,
      numberOfGroupByProps,
    } = ui;

    const groupByValue = groupBy ? groupBy[0] : '';
    const groupByValue2 = groupByValue ? groupBy[1] : '';
    const elementsToRender = [];

    elementsToRender.push(<div key='groupBy1'>
      <div className='label'>Target property</div>
      <Select
        value={groupByValue && {
          label: groupByValue,
          value: groupByValue,
        }}
        options={this.getCurrentSchema().map(item => ({ label: item, value: item }) )}
        onChange={ (value) => {
          this.props.updateUI({
            groupBy: [value.value],
          });
        }}
        className=''
      />
      <div className='options'>
        <div className='orderBy'>
          <div className='label'>Order
            <span className='optional'>Optional</span>
          </div>
          <Select
            value={orderBy && {
              label: orderBy.direction,
              value: orderBy.direction,
            }}
            options={['ASC', 'DESC'].map(item => ({ label: item, value: item }) )}
            onChange={(value) => {
              this.props.updateUI({
                orderBy: {
                  property_name: 'result',
                  direction: value.value,
                },
              });
            }}
            className='select'
          />
        </div>
        <div className='limit'>
          <div className='label'>Limit
            <span className='optional'>Optional</span>
          </div>
          <input
            type='number'
            value={limit ? limit : ''}
            onChange={(e) => {
              this.props.updateUI({
                limit: parseInt(e.target.value),
              });
            }}
            placeholder='Eg. 10'
            className='inputNumber input'
          />
        </div>
      </div>
    </div>);

    if (numberOfGroupByProps === 2) {
      elementsToRender.push(
        <div key='groupBy2' className='additionalTargetProperty'>
          <div className='label'>Second target property</div>
          <Select
            value={groupByValue2 && {
              label: groupByValue2,
              value: groupByValue2,
            }}
            options={this.getCurrentSchema().map(item => ({ label: item, value: item }) )}
            onChange={(value) => {
              this.props.updateUI({
                groupBy: [groupBy[0], value.value],
              });
            }}
            className='standardUnits'
          />
        </div>);
    }

    return elementsToRender;
  }

  renderButton() {
    const { ui } = this.props;
    const { groupBy, numberOfGroupByProps } = ui;

    if (numberOfGroupByProps === 1) {
      return (
        <div
          role='button'
          tabIndex='0'
          className='btnPlus'
          onClick={() => {
            this.props.updateUI({
              numberOfGroupByProps: 2,
            });
          }}
        >
          <i className='fas fa-plus' />
        </div>
      );
    }

    return (
      <div
        role='button'
        tabIndex='0'
        className='btnMinus'
        onClick={() => {
          this.props.updateUI({
            groupBy: (groupBy ? [groupBy[0]] : null),
            numberOfGroupByProps: 1,
          });
        }}>
          <i className='fas fa-minus' />
        </div>
    );
  }

  render() {
    const { ui } = this.props;
    const { eventCollection } = ui;

    return (
      <div className='groupBy'>
        <div className='tabContent'>
          <div className='tab'>
            {
              !eventCollection &&
              <div className='box-info'>Choose an event collection first</div>
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
  mapDispatchToProps,
)(GroupBy);
