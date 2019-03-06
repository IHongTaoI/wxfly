const filters = {
  // 次数格式化
  countFromat(val) {
    if (val < 1000) return val
    if (val > 1000) {
      return (val / 1000).toFixed(1) + 'k'
    }
    if(val > 1000000) {
      return (val / 1000000).toFixed(1) + 'm'
    }
  }
};
export default Vue => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });
};
