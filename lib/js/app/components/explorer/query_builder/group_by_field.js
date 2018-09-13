import React from 'react';
import _ from 'lodash';
import FieldsToggle from '../../common/fields_toggle.js';

// Components
import ReactSelect from '../../common/react_select.js';

class GroupByField extends React.Component {

  focusOnReactSelect(toggled) {
    if (toggled && !this.props.value) {
      var self = this;
      setTimeout(function(){
        self.refs.select.refs.input.focus();
      }, 100);
    }
  }

  multiGroupToggle() {
    var icon = this.props.value.length > 1 ? 'remove' : 'plus';
    var text = this.props.value.length > 1 ? 'Remove second property' : 'Group by a second property';
    return (
      <a className="margin-top-tiny double-groupby-toggle" href="#" onClick={(e) => this.toggleMultiGroupBy(e)}>
        <i className={"margin-right-bump icon glyphicon glyphicon-"+icon}></i>
        {text}
      </a>
    );
  }

  secondField() {
    if (this.props.value.length > 1) {
      return (
        <div>
          <label className="margin-top-tiny">Second Target Property</label>
          <ReactSelect ref="select"
                     inputClasses="group-by form-control margin-bottom-tiny"
                     wrapClasses=""
                     name="group_by.1"
                     items={this.props.options}
                     handleChange={(e,v) => this.handleChange(e,v)}
                     value={this.props.value[1] || ''}
                     sort={true} />
        </div>
      )
    }
  }

  getGroupBy() {
    return this.props.value;
  }

  handleChange(name, value) {
    var newVal = this.props.value.slice();
    newVal[name.split('.')[1]] = value;
    this.props.handleChange('group_by', newVal);
  }

  handleChangeOrder(name, value) {
    this.props.handleChange('order_by', {
      property_name: 'result',
      direction: value
    });
  }

  handleChangeLimit(value) {
    this.props.handleChange('limit', value);
  }

  handleChangeOrderReset() {
    this.props.handleChange('order_by', null);
    this.handleChangeLimit(null);
  }

  toggleMultiGroupBy(event) {
    event.preventDefault();
    var newVal;
    switch (this.props.value.length) {
      case 0:
        newVal = ['', ''];
        break;
      case 1:
        newVal = this.props.value.concat(['']);
        break;
      case 2:
        newVal = this.props.value.slice(0,1);
        break;
    }
    this.props.handleChange('group_by', newVal);
  }

  shouldBeOpen() {
    return this.props.value && this.props.value[0]
  }

  // React methods

  render() {
    return (
      <div className="field-component">
        <FieldsToggle ref="toggle"
                      name="Group by - Order by"
                      initialOpenState={this.shouldBeOpen()}
                      updateFn={(e) =>this.props.updateGroupBy(e)}
                      getFn={() => this.getGroupBy()}
                      attrsToStore="group_by"
                      handleReset={() => this.handleChangeOrderReset()}
                      resetValues={{
                        group_by: [],
                        order_by: null,
                        limit: null
                      }}
                      toggleCallback={(toggle) => this.focusOnReactSelect(toggle)}>
                      <label>Target property</label>
          <ReactSelect ref="select"
                       inputClasses="group-by form-control margin-bottom-tiny"
                       name="group_by.0"
                       items={this.props.options}
                       handleChange={(e, v) => this.handleChange(e, v)}
                       value={this.props.value[0] || ''}
                       sort={true} />
                       <label>Order</label>
                       <ReactSelect ref="select"
                                    inputClasses="group-by form-control margin-bottom-tiny"
                                    name="order_by"
                                    items={['ASC', 'DESC']}
                                    handleChange={(e, v) => this.handleChangeOrder(e, v)}
                                    value={ (this.props.valueOrderBy && this.props.valueOrderBy.direction) || 'ASC'}
                                    sort={true} />
                      <label>Limit</label>
                      <input type="number"
                             name="limit"
                             className="form-control property-value margin-bottom-tiny"
                             value={this.props.valueLimit || '10'}
                             onChange={(e) => {
                               this.handleChangeLimit(parseInt(e.target.value));
                             }}
                             autoComplete="off" />
          {this.secondField()}
          {this.multiGroupToggle()}
        </FieldsToggle>
      </div>
    );
  }

};

export default GroupByField;
