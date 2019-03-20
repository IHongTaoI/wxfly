'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  container: {
    overflowY: 'scroll'
  }
};

exports.default = {
  name: 'auto-virtual-scroll-list',
  props: {
    totalHeight: { type: Number, required: true },
    defaultHeight: { type: Number, required: true },
    extraItems: { type: Number, default: 1 },
    tobottom: undefined,
    onscroll: undefined
  },
  data: function data() {
    return {
      offset: 0, // items offset
      heights: [],
      scrollTop: 0,
      numberOfItems: false
    };
  },

  methods: {
    /** Reset component (variables and scroll) */
    reset: function reset() {
      this.offset = 0;
      this.heights = [];
      this.scrollTop = 0;
      this.numberOfItems = false;
      this.$refs.container.scrollTop = 0; // reset scroll
    },

  },
  /** Sets callback to update the scrollTop variable */
  mounted: function mounted() {
    var _this = this;

    var _$refs = this.$refs,
        container = _$refs.container,
        scrollTop = _$refs.scrollTop;

    container.onscroll = function () {
      // listen for change only to avoid loop
      var newScroll = container && container.scrollTop || 0;
      if (newScroll !== scrollTop) _this.scrollTop = newScroll;
      _this.onscroll && _this.onscroll(this, {offset: newScroll})
    };
  },

  /** Listen to change in slot items as well as to rendered children height */
  updated: function updated() {
    var _this2 = this;

    var _$slots$default = this.$slots.default,
        defaultItems = _$slots$default === undefined ? [] : _$slots$default,
        numberOfItems = this.numberOfItems;
    // if number of items is unknown set it

    if (!numberOfItems) this.numberOfItems = defaultItems.length;
    // else if number of items changed reset the component
    else if (numberOfItems !== defaultItems.length) this.reset();

    // nextTick -> need to wait for the offset to be reloaded if scroll
    // changed (which happens at render)
    _vue2.default.nextTick(function () {
      var htmlChildren = _this2.$el.children,
          offset = _this2.offset;

      var htmlAsArray = (0, _from2.default)(htmlChildren);
      var children = htmlAsArray.slice(1, htmlAsArray.length - 1); // remove empty divs
      // updated heights based on rendered items
      children.forEach(function (child, i) {
        var index = i + offset;
        if (!_this2.heights[index]) _this2.heights[index] = child.offsetHeight;
      });
    });
    this.$emit('updated');
  },
  render: function render(h) {
    // eslint-disable-line no-unused-vars
    var _$slots$default2 = this.$slots.default,
        defaultItems = _$slots$default2 === undefined ? [] : _$slots$default2,
        scrollTop = this.scrollTop,
        heights = this.heights,
        defaultHeight = this.defaultHeight,
        totalHeight = this.totalHeight,
        extraItems = this.extraItems;

    var index = 0; // current item being analysed
    var heightAcc = 0; // cumulative height for the item
    // calculate space occupied by hidden elements
    for (;;) {
      var itemHeight = heights[index] || defaultHeight;
      if (heightAcc + itemHeight > scrollTop) break;
      index += 1;
      heightAcc += itemHeight;
    }
    var paddingTop = heightAcc; // result occupied space
    // calculate number of elements shown
    var items = [];
    this.offset = index;
    for (; heightAcc - paddingTop < totalHeight && index < defaultItems.length; index += 1) {
      var item = defaultItems[index];
      items.push(item);
      heightAcc += heights[index] || defaultHeight;
    }
    // add extra items (from prop)
    for (var i = 0; i < extraItems; i += 1) {
      var _item = defaultItems[index];
      if (_item === undefined) break;
      items.push(_item);
      index += 1;
      heightAcc += heights[index] || defaultHeight;
    }
    // calculate space after
    var paddingBottom = 0;
    for (; index < defaultItems.length; index += 1) {
      paddingBottom += heights[index] || defaultHeight;
    }

    if(Math.abs((paddingTop + paddingBottom) - this.scrollTop) <= 5) {
      this.tobottom && this.tobottom();
    }
    return h(
      'div',
      { ref: 'container', style: [styles.container, { height: totalHeight + 'px' }] },
      [h(
        'div',
        { style: { width: '100%', height: paddingTop + 'px' } },
        []
      ), ' ', items, h(
        'div',
        { style: { width: '100%', height: paddingBottom + 'px' } },
        []
      ), ' ']
    );
  }
};