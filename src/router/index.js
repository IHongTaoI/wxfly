import Vue from 'vue';
import Router from 'vue-router';
import store from './../vuex/store';
Vue.use(Router);

const vuerouter = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./../App.vue'),
    }
  ]
});

export default vuerouter;
