import Vue from 'vue';
import App from './../App';
import router from './../router';
import store from './../vuex/store';
import axios from './http';
import VueAxios from 'vue-axios';
import utils from '../utils/index';
import Vant from 'vant';
import 'vant/lib/index.css';

export default function() {
  Vue.use(VueAxios, axios);
  Vue.use(Vant);
  Vue.prototype.$utils = utils;
  Vue.config.productionTip = false;

  new Vue({
    el: '#app',
    router,
    components: { App },
    store,
    template: '<App/>'
  });
}
