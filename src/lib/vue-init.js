import Vue from 'vue';
import App from './../App';
import router from './../router';
import store from './../vuex/store';
import axios from './http';
import VueAxios from 'vue-axios';
import utils from '../utils/index';
import apiHelper from './../utils/api-helper';
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import socketInit from './../utils/socket-init';
import VueAutoVirtualScrollList from './vue-virtual-Infinite-list';
import loadinganite from './../page/home/child/loading-animate.vue';
import baiduMap from './baiduMap';
import initProto from './init-proto';
import wxInfo from './../common/vue-plugin/wx-info/index'

export default function() {
  initProto();
  Vue.use(VueAxios, axios);
  Vue.use(Vant);
  Vue.use(Lazyload);
  Vue.use(wxInfo);
  Vue.component('auto-virtual-list', VueAutoVirtualScrollList);
  Vue.component('loadinganite', loadinganite);
  Vue.prototype.$BMap = baiduMap();
  Vue.prototype.$utils = utils;
  Vue.prototype.$apihelper = apiHelper;
  Vue.config.productionTip = false;
  window.vueObj = new Vue({
    el: '#app',
    router,
    components: { App },
    store,
    template: '<App/>',
    async beforeCreate() {
      let token = utils.cookie.get('token');
      let userId = utils.cookie.get('userId');
      if (token && userId) {
        store.dispatch('user/login_success', token);
        socketInit();
      } else {
        this.$router.replace({
          path: '/login'
        });
      }
    }
  });
}
