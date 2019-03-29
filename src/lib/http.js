import axios from 'axios';
import Vue from 'vue';
import store from './../vuex/store';
import utils from './../utils/index';
import router from './../router/index';
// 默认值配置
axios.defaults.baseURL = store.state.ajaxUrl;
axios.defaults.showLoading = true;
axios.defaults.showErr = true;
axios.defaults.timeout = 30000;

const showNotify = function(txt) {
  Vue.prototype.$notify({
    message: txt,
    className: 'notify'
  });
};

const onerror = error => {
  Vue.prototype.$toast.clear();
  if (
    error.code === 'ECONNABORTED' &&
    error.message.indexOf('timeout') !== -1
  ) {
    return error.config.showErr && showNotify('请求超时');
  }
  let msg = error.response.data.msg || '请求失败';
  error.config.showErr && showNotify(msg);
};
axios.interceptors.request.use(function(config) {
  // config.headers['Content-Type'] = ' application/x-www-form-urlencoded'
  config.showLoading &&
    Vue.prototype.$toast.loading({
      mask: false,
      message: '加载中...',
      duration: 0
    });
  return config;
}, onerror);

axios.interceptors.response.use(function(response) {
  Vue.prototype.$toast.clear();
  let res = response.data;
  if (res.status === '200000') {
    if (res.data && res.data.serviceHeader) {
      return {
        h: res.data.serviceHeader,
        d: res.data.serviceBody
      };
    }
    return true;
  } else {
    if (res.status === '500004') {
      // 登录过期
      utils.cookie.delete('token');
      showNotify('登录过期，请重新登录');
      setTimeout(() => {
        router.replace({
          path: 'login'
        });
      }, 200);
      return;
    }
    response.config.showErr && Vue.prototype.$notify(res.msg);
    return false;
  }
}, onerror);

async function post({
  url,
  data = {},
  config = {
    files: false
  },
  sheader = {}
}) {
  if (!config.files) {
    // 如果不是传文件
    let serviceHeader = {
      token: utils.cookie.get('token'),
      userId: utils.cookie.get('userId')
    };
    serviceHeader = Object.assign(serviceHeader, sheader);
    data = {
      serviceHeader,
      serviceBody: data
    };
  }
  let ret = await axios.post(url, data, config);
  if (ret) return ret;
}

export { post };

export default axios;
