const styles = {
  container: {
    overflowY: 'scroll',
    width: '100%',
    height: '100%'
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
  render(h) {
    const _solt = this.$slots.default;
    if (!_solt) return;
    let listDom = [],
      defaultHeight = this.defaultHeight,
      scrollTop = this.scrollTop,
      heights = this.heights;
    paddingTop = 0;
    paddingBottom = 0;
    let heightAll = 0,
      index = 0;

    Array.prototype.forEach.call(_solt, (v, i) => {
      const index = i;
      let H = 0;
      if (v.data && v.data.style && v.data.style.height) {
        H = parseInt(v.data.style.height);
      }
      if (!this.heights[index]) this.heights[index] = H;
    });

    while (true) {
      if (!heights.length) break;
      let itemHeight = heights[index] || defaultHeight;
      if (heightAll + itemHeight > scrollTop - 700) break;
      index += 1;
      heightAll += itemHeight;
    }
    paddingTop = heightAll;
    let Domend = index + 13;
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
        h(
          'div',
          {
            style: [
              {
                paddingTop: paddingTop + 'px',
                paddingBottom: paddingBottom + 'px'
              }
            ]
          },
          listDom
        )
      ]
    );
  }
};
