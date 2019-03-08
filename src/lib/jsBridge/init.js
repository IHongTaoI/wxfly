import Vue from 'vue';
import EVENT from "./EVENT";

export default function(Vueinit) {
  return function() {
    Vue.prototype.$native = EVENT();
    Vueinit();
  };
}
