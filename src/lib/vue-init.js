import Vue from 'vue';
import App from './../App';
import router from './../router';
import store from './../vuex/store';
import axios from './http';
import VueAxios from 'vue-axios';
import { Field, Cell, CellGroup, Button } from 'vant';

export default function() {
  Vue.use(VueAxios, axios);
  Vue.use(Cell).use(CellGroup);
  Vue.use(Field);
  Vue.use(Button);
  Vue.config.productionTip = false;

  new Vue({
    el: '#app',
    router,
    components: { App },
    store,
    template: '<App/>'
  });
}
