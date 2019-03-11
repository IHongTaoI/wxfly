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
import VirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export default function() {
  Vue.use(VueAxios, axios);
  Vue.use(Vant);
  Vue.use(Lazyload);
  Vue.use(VirtualScroller);

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
      // let cookies = utils.getCookiesUserinfo();
      let seesionuser = localStorage.getItem('seesionuser');
      let cookies = seesionuser ? JSON.parse(seesionuser) : false;
      if (cookies) {
        store.commit('user/LOGIN_SUCCESS', cookies);
        socketInit();
      }
    }
  });
}
