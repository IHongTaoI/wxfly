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
  let msg = error.response.data.msg || '请求失败';
  error.config.showErr && Vue.prototype.$notify(msg);
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
  let res = response.data
  if (res.status === '200000') {
    if(res.data && res.data.serviceHeader) {
      return {
        h: res.data.serviceHeader,
        d: res.data.serviceBody
      }
    }
  } else {
    response.config.showErr && Vue.prototype.$notify(res.msg);
    return false
  }
}, onerror);

async function post({
  url,
  data,
  config = {},
  qheader = {}
}) {

  let serviceHeader = {
    "token": store.state.user.token,
    "userId": store.state.user.userId
  }
  serviceHeader = Object.assign(serviceHeader, qheader)
  data = {
    serviceHeader,
    serviceBody: data
  }
  let ret = await axios.post(url, data, config)
  return ret
}

export {
  post
}

export default axios;
