const filters = {
  // 次数格式化
  countFromat(val) {
    if (val < 1000) return val;
    if (val > 1000) {
      return (val / 1000).toFixed(1) + 'k';
    }
    if (val > 1000000) {
      return (val / 1000000).toFixed(1) + 'm';
    }
  },
  distanceFromat(distance) {
    return distance < 1
      ? parseInt(distance * 1000) + '米'
      : Math.ceil(distance) + '公里';
  }
};
export default Vue => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });
};
