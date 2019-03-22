const styles = {
  container: {
    overflowY: 'scroll'
  }
};

let paddingTop = 0,
  paddingBottom = 0;

export default {
  name: 'vue-virtual-Infinite-list',
  props: {
    defaultHeight: {
      type: Number,
      default: 200
    },
    tobottom: undefined
  },
  data() {
    return {
      heights: [],
      offset: 0,
      scrollTop: 0
    };
  },
  methods: {
    onscroll(e, obj) {
      this.$emit('onscroll', e, obj);
    }
  },
  mounted() {
    const container = this.$refs.container,
      _this = this;

    container &&
      (container.onscroll = function() {
        _this.scrollTop = this.scrollTop || 0;
        _this.onscroll(this, { offset: this.scrollTop });
        if (paddingBottom === 0) {
          _this.$emit('tobottom');
        }
      });
  },
  updated() {
    const offset = this.offset;
    this.$nextTick(() => {
      // const cDom = this.$el.children; // 之后再研究，真实计算dom
      const cDom = this.$slots.default;
      Array.prototype.forEach.call(cDom, (v, i) => {
        const index = i + offset;
        let H = 0;
        if (v.data && v.data.style && v.data.style.height) {
          H = parseInt(v.data.style.height);
        }
        if (!this.heights[index]) this.heights[index] = H;
      });
    });
  },
  render(h) {
    const _solt = this.$slots.default;
    let listDom = [],
      defaultHeight = this.defaultHeight,
      scrollTop = this.scrollTop,
      heights = this.heights;
    paddingTop = 0;
    paddingBottom = 0;
    let heightAll = 0,
      index = 0;

    while (true) {
      let itemHeight = heights[index] || defaultHeight;
      if (heightAll + itemHeight > scrollTop) break;
      index += 1;
      heightAll += itemHeight;
    }
    paddingTop = heightAll;
    let Domend = index + 8;
    for (; index < Domend; index++) {
      listDom.push(_solt[index]);
    }

    for (; index < _solt.length; index += 1) {
      paddingBottom += heights[index] || defaultHeight;
    }

    return h(
      'div',
      {
        ref: 'container',
        style: [styles.container]
      },
      [
        h('div', {
          style: [{ height: paddingTop + 'px' }]
        }),
        listDom,
        h('div', {
          style: [{ height: paddingBottom + 'px' }]
        })
      ]
    );
  }
};
