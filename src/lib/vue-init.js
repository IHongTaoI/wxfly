import Vue from 'vue';
import App from './../App';
import router from './../router';
import store from './../vuex/store';
import axios from './http';
import VueAxios from 'vue-axios';
import utils from '../utils/index';
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import socketInit from './../utils/socket-init';

export default function() {
  Vue.use(VueAxios, axios);
  Vue.use(Vant);
  Vue.use(Lazyload);
  Vue.prototype.$utils = utils;
  Vue.config.productionTip = false;
  window.vueObj = new Vue({
    el: '#app',
    router,
    components: { App },
    store,
    template: '<App/>',
    async beforeCreate() {
      let cookies = utils.getCookiesUserinfo();
      if (cookies) {
        socketInit();
      }
    }
  });
}

