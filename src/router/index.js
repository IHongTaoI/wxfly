import Vue from 'vue';
import Router from 'vue-router';
import routes from './router'
import store from './../vuex/store';
Vue.use(Router);

function scrollBehavior(to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}

const vuerouter = new Router({
  scrollBehavior,
  routes,
});

export default vuerouter;
