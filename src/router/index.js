import Vue from 'vue';
import Router from 'vue-router';
import routes from './router';
import store from './../vuex/store';
Vue.use(Router);

function scrollBehavior(to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    };
  }
}

const vuerouter = new Router({
  mode: 'history',
  scrollBehavior,
  routes
});

vuerouter.beforeEach((to, from, next) => {
  let rules = ['/', '/self', '/read', '/message'];
  if (rules.includes(to.path)) {
    // 如果是主页上，不能按返回,并且监听返回键
    if (store.state.platform.isApicloud) {
    } else {
      window.history.pushState('forward', null, document.URL);
      window.onpopstate = () => {
        window.history.pushState('forward', null, document.URL);
        window.history.forward(1);
      };
    }
  } else {
    // 取消监听返回
    if (store.state.platform.isApicloud) {
    } else {
      window.onpopstate = null;
    }
  }
  next();
});

export default vuerouter;
