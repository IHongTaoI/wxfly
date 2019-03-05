// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './vuex/store';
import vueInit from './lib/vue-init';
import NativeInit from './lib/jsBridge/init';
import Vconsole from 'vconsole';
import filters from './utils/filters'

filters(Vue);

if (store.state.platform.isApicloud) {
  window.apiready = NativeInit(vueInit);
  process.env.NODE_ENV === "development" && new Vconsole();
} else {
  vueInit();
}
