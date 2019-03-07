import Vue from 'vue';
import io from 'socket.io-client';
import store from './../vuex/store';
import VueSocketio from 'vue-socket.io-extended';
import utils from './index';

export default async function() {
  const SOCKET = io(
    `ws://134.175.16.212:2019/webSocket?token=${
      utils.getCookiesUserinfo().h.token
    }`,
    { autoConnect: true }
  );
  Vue.use(VueSocketio, SOCKET, { store });
}
