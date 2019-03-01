import Vue from 'vue';
import Vuex from 'vuex';
import common from './common/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ajaxUrl: 'http://148.70.2.46:7001',
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
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    common
  }
});
