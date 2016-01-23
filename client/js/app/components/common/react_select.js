var React = require('react');

/* TODO:
[ ] resting state (selection/empty)
[x] activate component on `up/down` key, or by typing
[x] 'esc' key to close w/out changing selection (webkit pattern)
[~] accessibility
    [x] announce/surface options to screen readers
    [x] input field should instruct further key controls
[x] snag: re-activating w/ prior selection -> only see that selection
    - should we show all on first (re-)focus?
    - only filter list when typing? track interaction states?
[ ] snag: long strings wrap and throw off scroll-sync
    - truncrate at calc'd length? maybe truncate the middle? 'beginning.ah...ok.end'
    - crazy: 'walk' the truncatation of the 'active' li (from right to left) after a 1-2sec 'pause'
    - can we use 'left/right' key actions to change truncation? maybe w/ CSS?
[ ] snag: mobile. perhaps we should revert to native elements, to avoid input+list+keyboard hysteria?
[ ] bug: Escape event listener bubbles up and closes the modal.
[ ] bug: With breaks on selects inside filter manager modal.
*/

var ReactSelect = React.createClass({

  getDefaultProps: function() {
    return {
      items: [],
      wrapClasses: '',
      inputClasses: '',
      placeholder: '',
      handleBlur: function(){},
      handleChange: function(){},
      handleSelection: function(){}
    };
  },

  getInitialState: function() {
    return {
      focusedItem: '',
      limit: 30,
      initialFocus: false,
      selectedItem: 0,
      visible: false,
      visibleItems: 0
    };
  },

  resetState: function(){
    this.setState({
      focusedItem: '',
      limit: 30,
      selectedItem: 0,
      visible: false,
      initialFocus: true
    });
  },

  handleClick: function(e) {
    this.setState({ visible: true });
    this.handleItemFocus();
  },

  handleChange: function(e) {
    var newState = {
      initialFocus: false
    };
    if (this.state.visible) {
      newState['limit'] = 30;
      newState['selectedItem'] = 0;
      this.refs.scrollpane.scrollTop = 0;
    }
    else {
      newState['visible'] = true;
    }
    this.setState(newState);
    this.props.handleChange(
      this.props.name,
      this.refs.input.value
    );
  },

  handleFocus: function(e) {
    if (!this.state.visible) {
      this.setState({
        initialFocus: true,
        visible: true
      });
    }
    else {
      this.resetState();
    }
  },

  handleBlur: function(e) {
    if (this.refs.scrollpane && e.relatedTarget !== this.refs.scrollpane) {
      if (!this.state.visible) e.preventDefault();
      this.resetTimeout = setTimeout(this.resetState, 100);
      this.blurTimeout = setTimeout(this.props.handleBlur(e), 100);
    }
  },

  handleItemFocus: function() {
    clearTimeout(this.resetTimeout);
    clearTimeout(this.blurTimeout);
  },

  handleItemSelection: function(index) {
    if (typeof this.props.items[index]) {
      var selection = String(this.props.items[index]);
      this.setState({ initialFocus: false });
      this.refs.input.focus();
      this.resetState();
      this.props.handleChange(this.props.name, selection);
      this.props.handleSelection(this.props.name, selection);
    }
  },

  handleKeyDown: function(e) {
    var itemHeight, itemOffset;

    if (e.key === "Tab" || e.key === "Shift") return;

    this.setState({ visible: true });

    if (this.refs.list && this.state.selectedItem) {
      itemHeight = this.refs.list.children[this.state.selectedItem].scrollHeight + 1;
      itemOffset = itemHeight * this.state.selectedItem;
    }

    if (this.keyDownCallbacks[e.key]) {
      this.keyDownCallbacks[e.key].call(this, e, itemHeight, itemOffset);
    }
  },

  keyDownCallbacks: {

    "ArrowUp": function(e, itemHeight, itemOffset) {
      var newState = {};
      var list = this.refs.list;

      if (this.state.selectedItem-1 >= 0) {
        newState['selectedItem'] = this.state.selectedItem-1;
        if (list) {
          newState['focusedItem'] = list.children[this.state.selectedItem-1].innerHTML;
        }
      }
      else {
        newState['selectedItem'] = 0;
        if (list) {
          newState['focusedItem'] = list.children[0].innerHTML;
        }
      }
      this.setState(newState);

      if (list && itemOffset > itemHeight*3) {
        this.refs.scrollpane.scrollTop -= itemHeight;
      }
      e.preventDefault();
    },

    "ArrowDown": function(e, itemHeight, itemOffset) {
      var newState = {};
      var list = this.refs.list;

      if (this.state.selectedItem+1 < this.visibleItems) {
        newState['selectedItem'] = this.state.selectedItem+1;
        if (list) {
          newState['focusedItem'] = this.refs.list.children[this.state.selectedItem+1].innerHTML;
        }
      }
      else {
        newState['selectedItem'] = this.visibleItems-1;
        if (list) {
          newState['focusedItem'] = list.children[this.visibleItems-1].innerHTML;
        }
      }
      this.setState(newState);

      if (list && itemOffset > itemHeight*3) {
        this.refs.scrollpane.scrollTop += itemHeight;
      }
      e.preventDefault();
    },

    "Enter": function(e, itemHeight, itemOffset) {
      var list = this.refs.list;
      if (list) {
        var childNode = list.children[this.state.selectedItem];
        if (childNode) this.handleItemSelection( childNode.getAttribute('data-index') );
      }
      else {
        this.resetState();
      }
      e.preventDefault();
    },

    "Escape": function(e, itemHeight, itemOffset) {
      this.handleBlur(e);
      e.preventDefault();
    }

  },

  handleScroll: function(e) {
    var pane = this.refs.scrollpane;
    var diff = pane.scrollHeight - pane.scrollTop - 200;
      // -200 offset is a hack to account for fixed height
    if (diff < 50) {
      this.setState({ limit: this.state.limit + 30 });
    }
  },

  // Data management

  appendListItems: function(arr) {
    var self = this;
    arr.forEach(function(opt, i){
      self.props.items.push(opt);
    });
    this.forceUpdate();
    return this;
  },

  insertListItems: function(index, arr){
    this.props.items.splice.apply(this.props.items, [index,0].concat(arr));
    this.forceUpdate();
    return this;
  },

  removeListItems: function(){
    this.props.items = [];
    this.forceUpdate();
    return this;
  },

  getItems: function() {
    var self = this;
    var count = 0;
    this.visibleItems = 0;
    var inputString = this.state.initialFocus ? '' : (this.props.value || '');
    return this.props.items.map(function(item, index) {
      // If input is present, skip items that don't match
      if (inputString.length > 0 && String(item).toLowerCase().search(inputString.toLowerCase()) < 0) return;

      // Simple result limiting
      count++; if (count > self.state.limit) return;
      self.visibleItems = self.visibleItems+1;
      return (
        <li className={self.state.selectedItem === count-1 ? "react-select-item active" : "react-select-item" }
          key={index}
          data-index={index}
          onMouseDown={self.handleItemSelection.bind(self, index)}
          onFocus={self.handleItemFocus.bind(self, index)}
          aria-live="polite"
          role="option">
            {item}
        </li>
      );
    });
  },

  getScrollPane: function(items) {
    // Hide scrollpane unless active
    if (this.state.visible) {
      return (
        <div
        ref="scrollpane"
        className="react-select-scrollpane"
        onScroll={this.handleScroll}
        tabIndex="-1"
        aria-hidden="false">
          <div className="react-select-aria-notice" aria-live="assertive">
            {this.state.focusedItem || ''}
          </div>
          <ul ref="list" className="react-select-list"
              aria-atomic="false"
              aria-label="Begin typing to filter options, or key up or down to browse available options"
              aria-live="assertive"
              aria-relevant="additions"
              role="listbox"
              id={this.props.id + '-scrollpane'}>
            {items}
          </ul>
        </div>
      );
    }
  },

  // React methods

  render: function(){
    var items = this.getItems();
    var scrollpane = this.getScrollPane(items);

    var wrapClasses = 'react-select';
    if (this.props.wrapClasses) {
      wrapClasses = wrapClasses + ' ' + this.props.wrapClasses;
    }
    if (this.state.visible) {
      wrapClasses = wrapClasses + ' visible';
    }

    var inputClasses = 'react-select-input';
    if (this.props.inputClasses) {
      inputClasses = inputClasses + ' ' + this.props.inputClasses;
    }

    return (
      <div ref="wrapper" className={wrapClasses}>
        <input ref="input"
               name={this.props.name}
               className={inputClasses}
               value={this.props.value || ""}
               placeholder={this.props.placeholder}
               onClick={this.handleClick}
               onChange={this.handleChange}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}
               onKeyDown={this.handleKeyDown}
               aria-expanded={this.state.visible}
               aria-owns={this.props.id + '-scrollpane'}
               aria-label={this.props.title || "Select value"}
               aria-selected={(this.props.value && this.props.value.length) ? true : undefined}
               aria-live="polite" />
        {scrollpane}
      </div>
    );
  }

});

module.exports = ReactSelect;
