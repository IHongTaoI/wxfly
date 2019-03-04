import axios from 'axios';
import Vue from 'vue';
import store from './../vuex/store';
// 默认值配置
axios.defaults.baseURL = store.state.ajaxUrl;
axios.defaults.showLoading = true;
axios.defaults.showErr = true;
axios.defaults.timeout = 10000;
const onerror = error => {
  Vue.prototype.$toast.clear();
  if (
    error.code === 'ECONNABORTED' &&
    error.message.indexOf('timeout') !== -1
  ) {
    return (error.config.showErr && Vue.prototype.$notify('请求超时'));
  }
  error.config.showErr && Vue.prototype.$notify('请求失败');
};
axios.interceptors.request.use(function (config) {
  // config.headers['Content-Type'] = ' application/x-www-form-urlencoded'
  config.showLoading &&
    Vue.prototype.$toast.loading({
      mask: false,
      message: '加载中...',
      duration: 0
    });
  return config;
}, onerror);

axios.interceptors.response.use(function (response) {
  Vue.prototype.$toast.clear();
  return response;
}, onerror);

Vue.prototype.$post = async function (config) {
  let res = await axios.post(config.url, config.data, {
    showLoading: config.showLoading || false
  });
  if (res.data.code === 10000) {
    config.success(res.data);
  } else {
    config.error(res.msg);
  }
};

export default axios;
