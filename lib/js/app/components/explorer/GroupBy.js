import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactSelect from './shared/ReactSelect';
import { getThemeForSelect } from '../../utils/style';
import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = state => (
  {
    ui: state.ui,
    schemas: state.collections.schemas,
    eventCollection: state.ui.eventCollection,
  }
);

const mapDispatchToProps = {
  updateUI,
};

class GroupBy extends Component {
  getCurrentSchema() {
    const {
      schemas,
      eventCollection,
    } = this.props;
    const schema = schemas[eventCollection] || {};
    return Object.keys(schema);
  }

  renderSelects() {
    const {
      ui,
    
      updateUI,
    } = this.props;
    const {
      groupBy,
      orderBy,
      limit,
      numberOfGroupByProps,
    } = ui;

    const groupByValue = groupBy ? groupBy[0] : '';
    const groupByValue2 = groupByValue ? groupBy[1] : '';
    const elementsToRender = [];

    const sortedSchemaProps = this.getCurrentSchema()
      .sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) { return -1; }
        if (a.toLowerCase() > b.toLowerCase()) { return 1; }
        return 0;
      })
      .map(item => ({ label: item, value: item }));

    elementsToRender.push(<div key='groupBy1'>
      <div className='label-main'>Target property</div>
      <ReactSelect
        value={groupByValue && {
          label: groupByValue,
          value: groupByValue,
        }}
        options={sortedSchemaProps}
        onChange={(value) => {
          updateUI({
            groupBy: [value.value],
          });
        }}
        theme={getThemeForSelect}
      />
      <div className='options'>
        <div className='order-by'>
          <div className='label-main'>Order
            <span className='optional'>Optional</span>
          </div>
          <ReactSelect
            value={orderBy && {
              label: orderBy.direction,
              value: orderBy.direction,
            }}
            options={['ASC', 'DESC'].map(item => ({ label: item, value: item }) )}
            onChange={(value) => {
              updateUI({
                orderBy: {
                  property_name: 'result',
                  direction: value.value,
                },
              });
            }}
            className='select'
            theme={getThemeForSelect}
          />
        </div>
        <div className='limit'>
          <div className='label-main'>Limit
            <span className='optional'>Optional</span>
          </div>
          <input
            type='number'
            value={limit ? limit : ''}
            onChange={(e) => {
              updateUI({
                limit: parseInt(e.target.value),
              });
            }}
            placeholder='Eg. 10'
            className='input-number input'
          />
        </div>
      </div>
    </div>);

    if (numberOfGroupByProps === 2) {
      elementsToRender.push(
        <div key='groupBy2' className='additional-target-property'>
          <div className='label-main'>Second target property</div>
          <ReactSelect
            value={groupByValue2 && {
              label: groupByValue2,
              value: groupByValue2,
            }}
            options={sortedSchemaProps}
            onChange={(value) => {
              updateUI({
                groupBy: [groupBy[0], value.value],
              });
            }}
            className='standard-units'
            theme={getThemeForSelect}
          />
        </div>);
    }

    return elementsToRender;
  }

  renderButton() {
    const {
      ui,
      updateUI,
    } = this.props;
    const {
      groupBy,
      numberOfGroupByProps,
    } = ui;

    if (numberOfGroupByProps === 1) {
      return (
        <div
          role='button'
          tabIndex='0'
          className='btn-plus'
          onClick={() => {
            updateUI({
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
        className='btn-minus'
        onClick={() => {
          updateUI({
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
      <div className='group-by'>
        <div className='tab-content'>
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
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupBy);
