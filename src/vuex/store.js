import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import listHelper from './modules/listHelper';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ajaxUrl: 'http://www.wuxfly.com:2019',
    routerPathC: [], // 路由缓存
    curRoutePath: '/',
    platform: {
      isApicloud: navigator.userAgent.toLowerCase().includes('apicloud'),
      isWx: navigator.userAgent.toLowerCase().includes('micromessenger'),
      isIos: navigator.userAgent.match(/(iPhone|iPod|iPad);?/i),
      isAndroid: navigator.userAgent.match(/android/i),
      isWeb:
        !navigator.userAgent.toLowerCase().includes('micromessenger') &&
        !navigator.userAgent.toLowerCase().includes('apicloud')
    }
  },
  mutations: {
    setRouterCache(state, { isback, val }) {
      if (isback) {
        state.routerPathC.pop();
      } else {
        state.routerPathC.push(val);
      }
    },
    setRoutePath(state, path) {
      state.curRoutePath = path;
    }
  },
  getters: {},
  actions: {},
  modules: {
    user,
    listHelper
  }
});
